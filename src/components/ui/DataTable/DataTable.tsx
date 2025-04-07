import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { cn } from "../../../utils/cn";
import { ChangeEvent, Key, ReactNode } from "react";

interface PropTypes {
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  emptyContent: string;
  isLoading?: boolean;
  limit: string;
  totalPages: number;

  onChangeLimit: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChangePage: (p: number) => void;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;

  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
}

const DataTable = (props: PropTypes) => {
  const {
    columns,
    data,
    emptyContent,
    isLoading,
    limit,
    totalPages,

    onChangeLimit,
    onChangePage,
    onChangeSearch,
    onClearSearch,

    renderCell,
  } = props;

  return (
    <Table
      bottomContent={BottomContent}
      bottomContentPlacement="outside"
      classNames={{
        base: "max-w-full",
        wrapper: cn({ "overflow-x-hidden": isLoading }),
      }}
      topContent={TopContent}
      topContentPlacement="outside"
      aria-label="Data Table"
      selectionMode="single"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid as Key}>
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        emptyContent={emptyContent}
        isLoading={isLoading}
        items={data}
        loadingContent={
          <div className="flex h-full w-full items-center justify-center bg-foreground-700/30 backdrop-blur-sm">
            <Spinner className="text-yellow-950" />
          </div>
        }
      >
        {(item) => (
          <TableRow key={item.id as Key} aria-labelledby="row">
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
