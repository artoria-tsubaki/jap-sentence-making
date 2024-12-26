import { Row } from "@tanstack/react-table"
import { Descriptions, Modal } from "antd"
import type { DescriptionsProps } from 'antd';
import { priorities, statuses } from "../data/data";

import { RowDataType } from "../data/data"

interface DeitalProps<TData> {
  row: Row<TData>;
  isModalOpen: boolean;
  handleCancel: () => void;
}

export function RowDetail<TData>({ row,  isModalOpen, handleCancel }: DeitalProps<TData>) {
  const rowData = row.original as RowDataType
  console.log(rowData)
  // TODO: Implement row detail
  const items:DescriptionsProps['items'] = [
    {
      label: "等级",
      children: row.getValue("level_name"),
      span: 2
    },
    {
      label: "语法",
      children: rowData.grammar_point,
      span: 2
    },
    {
      label: "接续",
      children: rowData.connection,
      span: 4
    },
    {
      label: "解说",
      children: rowData.explanation,
      span: 4
    },
    {
      label: "状态",
      children: statuses.find(status => status.value === row.getValue("status"))?.label,
      span: 2
    },
    {
      label: "优先度",
      children: priorities.find(priority => priority.value === row.getValue("priority"))?.label,
      span: 2
    },
    {
      label: "日文",
      children: rowData.japanese_sentence,
      span: 4
    },
    {
      label: "中文",
      children: rowData.chinese_translation,
      span: 4
    },
    {
      label: "英文",
      children: rowData.english_translation,
      span: 4
    },
    {
      label: "我的",
      children: rowData.jap_input,
      span: 4
    },
    {
      label: "链接",
      children: (
        <>
          <a href={rowData.href} target="_blank" rel="noreferrer" className="underline text-blue-500">查看</a>
        </>
      ),
      span: 4
    }
  ]
  const labelStyle: React.CSSProperties = { wordBreak: "keep-all" }
  return (
    <>
      <Modal title="View Details" 
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Descriptions
          bordered
          labelStyle={labelStyle}
          column={4}
          items={items}
        />
      </Modal>
    </>
  )
}