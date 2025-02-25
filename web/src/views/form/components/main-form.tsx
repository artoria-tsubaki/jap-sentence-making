"use client"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Grammar, Example, Sentence, Note, Proficiency } from "@/api/modules/form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Loader2, BotMessageSquare, Copy, Check, NotebookPen } from "lucide-react"
import { useState } from "react"

import { AttrDropdownRadio } from "./attrDropdownRadio"
import { priorities, statuses, proficiencies } from "@/views/list/data/data"
import { NotePointer } from "../interfaces"
import { cn } from "@/lib/utils"
import getCozeApi from "@/api/helper/cozeApi"

interface MainFormProps extends React.HTMLAttributes<HTMLElement> {
  activeItem: (Grammar & Note & Proficiency) | undefined;
  formList: (Example & Sentence & Note)[];
  pointer: NotePointer;
  noteShow: boolean;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onProficiencyChange: (value: string, id: number) => void;
  onPriorityChange: (value: string, id: number) => void;
  onStatusChange: (value: string, id: number) => void;
  onNoteShow: (props: NotePointer) => void;
  onSetPointer: React.Dispatch<React.SetStateAction<NotePointer>>;
  onFormSubmit: () => void;
}

export function MainForm({ 
  activeItem, 
  formList,
  pointer,
  noteShow, 
  onInputChange,
  onProficiencyChange, 
  onPriorityChange, 
  onStatusChange,
  onNoteShow,
  onSetPointer,
  onFormSubmit 
}: MainFormProps) {
  console.log('main form');
  const onNoteIconCick = (props: NotePointer) => {
    onNoteShow(props);
    console.log('click', props);
    
    setTimeout(() => {
      onSetPointer(props);
    })
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cozeResult, setCozeResult] = useState<string>("");
  const [currentSentence, setCurrentSentence] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleCozeClick = async (e: React.MouseEvent, formItem: Example & Sentence & Note) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDialogOpen(true);
    setIsLoading(true);
    setCurrentSentence(formItem.jap_input);
    
    try {
      const res = await getCozeApi(
        formItem.jap_input, 
        formItem.chinese_translation, 
        activeItem!.grammar_point
      );
      setCozeResult(JSON.parse(res.data).data.replace(/\n/g, '<br/>'));
    } catch (error) {
      console.log(error);
      setCozeResult("Failed to get response");
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopy = async () => {
    const plainText = cozeResult.replace(/<br\/>/g, '\n').replace(/<[^>]+>/g, '');
    await navigator.clipboard.writeText(plainText);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">

      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{ activeItem?.grammar_point }</h3>
            <div className="flex items-center space-x-2"> 
              {
                activeItem ? 
                <AttrDropdownRadio 
                  title="Proficiency"
                  value={activeItem?.proficiency} 
                  onValueChange={(value: string) => onProficiencyChange(value, activeItem?.id)}
                  dropdownMenuItems={proficiencies}
                  ClassName={"h-6 w-6"}
                ></AttrDropdownRadio> : <></>
              }
            <div 
              className={
                cn(
                  "flex items-center justify-center border-zinc-400 border border-solid rounded-full h-8 w-8 cursor-pointer",
                  (activeItem?.id === pointer.id && noteShow) ? 'bg-primary text-white' : ''
                )
              }
              onClick={() => onNoteIconCick({ id: activeItem?.id, type: 'Grammar', title: activeItem?.grammar_point, content: activeItem?.note_content, note_id: activeItem?.note_id })}
              >
              <NotebookPen className="h-4 w-4" />
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          { activeItem?.explanation }
        </p>
      </div>
      <Separator />
      <form>
        <div className="grid w-full items-center gap-12">
          {
            formList?.map((formItem: Example & Sentence & Note, formIndex: number) => {
              return (
                <div className="flex flex-col space-y-1.5" key={formItem.example_id}>
                  <Label htmlFor="name">{ (formIndex + 1) + '. ' + formItem.chinese_translation }</Label>
                  <Input value={formItem.jap_input} onChange={onInputChange} id={ String(formItem.example_id) } placeholder="" />
                  {
                    (formItem.sentence_id && formItem.jap_input) && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Reference Sentence: <span className="text-red-500">{ formItem.japanese_sentence }</span></span>
                            <div className="flex gap-1.5">
                              <AttrDropdownRadio 
                                title="Priority"
                                value={formItem.priority} 
                                onValueChange={(value: string) => onPriorityChange(value, formItem.example_id)}
                                dropdownMenuItems={priorities}
                              ></AttrDropdownRadio>
                              <AttrDropdownRadio 
                                title="Status"
                                value={formItem.status} 
                                onValueChange={(value: string) => onStatusChange(value, formItem.example_id)}
                                dropdownMenuItems={statuses}
                              ></AttrDropdownRadio>
                              <NotebookPen 
                                className={cn(
                                    "w-4 h-4 cursor-pointer", 
                                    (formItem.example_id === pointer.id && noteShow) ? "text-blue-500" : ""
                                  )
                                } 
                                onClick={
                                  () => onNoteIconCick(
                                    { id: formItem.example_id, type: 'Sentence', title: formItem.japanese_sentence, content: formItem?.note_content, note_id: formItem?.note_id }
                                  )
                                } />
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <BotMessageSquare className={"w-4 h-4 cursor-pointer"} onClick={(e) => handleCozeClick(e, formItem)} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>AI Suggestion</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                        <Separator className="bg-gray-400" />

                      </>
                    )
                  } 
                </div>
              )
            })
          }
          <div className="flex justify-end space-y-1.5">
            <Button type='button' onClick={() => onFormSubmit()}>Submit</Button>
          </div>
        </div>
      </form>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center">
              <DialogTitle>Analysis Result</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="h-8 w-8 p-0 ml-2"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Sentence: {currentSentence}
            </p>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div 
                className="text-sm whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: cozeResult }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}