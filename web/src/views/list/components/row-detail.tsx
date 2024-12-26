import { Row } from "@tanstack/react-table"
import { Descriptions, Modal } from "antd"
import type { DescriptionsProps } from 'antd';

interface DeitalProps<TData> {
  row: Row<TData>;
  isModalOpen: boolean;
  handleCancel: () => void;
}

export function RowDetail<TData>({ row,  isModalOpen, handleCancel }: DeitalProps<TData>) {
  const rowData = row.original
  console.log(rowData)
  // TODO: Implement row detail
  const items:DescriptionsProps['items'] = [
    {
      label: "",
      children: ""
    }
  ]
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
          column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
          items={items}
        />
      </Modal>
    </>
  )
}