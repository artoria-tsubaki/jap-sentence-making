import { useToast } from "@/hooks/use-toast"

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const toastError = (message) => {
  const { toast } = useToast();
  toast({
    variant: "destructive",
    title: "Uh oh! Something went wrong.",
    description: message
  })
}