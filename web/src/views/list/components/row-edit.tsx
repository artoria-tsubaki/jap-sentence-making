import { message, Modal } from "antd";
import { priorities, RowDataType, statuses } from "../data/data";
import { Row, Table } from "@tanstack/react-table";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { AttrDropdownRadio } from "@/views/form/components/attrDropdownRadio";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { store } from "@/redux";
import { putSentenceApi, Sentence } from "@/api/modules/form";

interface RowEditProps<TData> {
  row: Row<TData>;
  table: Table<TData>;
  isModalOpen: boolean;
  handleCancel: () => void;
}

export function RowEdit<TData>({ row, table, isModalOpen, handleCancel }: RowEditProps<TData>) {
  const rowData = row.original as RowDataType;
  const [japInput, setJapInput] = useState(rowData.jap_input);
  const [status, setStatus] = useState(rowData.status);
  const [priority, setPriority] = useState(rowData.priority);

  const handleSubmit = async () => {
    const userId = store.getState().global.userId;
    const params: Sentence = {
      user_id: userId,
      example_id: rowData.example_id,
      status: status,
      priority: priority,
      jap_input: japInput
    }
    if(rowData.sentence_id) {
      params.sentence_id = rowData.sentence_id;
    }
    const data = await putSentenceApi([params])
    if(data.code === 200) {
      message.success('提交成功');
      console.log(table)
      table.options.meta?.updateData(row.index, 'status', status);
      table.options.meta?.updateData(row.index, 'priority', priority);
      table.options.meta?.updateData(row.index, 'jap_input', japInput);
      handleCancel()
    }
  }
  
  return (
    <>
      <Modal title="Note" 
        open={isModalOpen}
        onCancel={handleCancel}
        centered
        footer={[
          <Button key="back" onClick={handleSubmit}>
            Submit
          </Button>
        ]}
      >
        <form>
          <div className="grid w-full items-center gap-6">
            <div className="flex items-center">
              <Label className="w-[120px] font-bold">Chinese Sentence:</Label>
              <span>{ rowData.chinese_translation }</span>
            </div>
            <div className="flex items-center">
              <Label className="w-[120px] font-bold" htmlFor="jap_input">Your Sentence:</Label>
              <Textarea
                className="flex-1" 
                id="jap_input" 
                value={japInput} 
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setJapInput(event.target.value)} 
              />
            </div>
            <div className="flex items-center">
              <Label className="w-[120px] font-bold" htmlFor="status">Status:</Label>
              <AttrDropdownRadio 
                title="Status"
                value={status} 
                onValueChange={(value: string) => { setStatus(value); }}
                dropdownMenuItems={statuses}
                ClassName="h-6 w-6"
              ></AttrDropdownRadio>
            </div>
            <div className="flex items-center">
              <Label className="w-[120px] font-bold" htmlFor="priority">Priority:</Label>
              <AttrDropdownRadio 
                title="Priority"
                value={priority} 
                onValueChange={(value: string) => { setPriority(value); }}
                dropdownMenuItems={priorities}
                ClassName="h-6 w-6"
              ></AttrDropdownRadio>
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}