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
import { Key, ReactNode } from "react";

interface PropTypes {
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  emptyContent: string;
  isLoading?: boolean;

  BottomContent: ReactNode;
  TopContent: ReactNode;

  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
}

const DataTable = (props: PropTypes) => {
  const {
    columns,
    data,
    emptyContent,
    isLoading,

    BottomContent,
    TopContent,

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
            <div
              className={cn("text-bold text-md px-4 py-2", {
                "flex items-center justify-center":
                  column.uid !== "customer_name",
              })}
            >
              {column.name as string}
            </div>
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
              <TableCell
                className={cn(
                  {
                    "w-[60px]":
                      columnKey === "actions" || columnKey === "table_number",
                  },
                  {
                    "w-2": columnKey === "no",
                  },
                )}
              >
                <div
                  className={cn("text-md px-4 py-2", {
                    "flex items-center justify-center":
                      columnKey !== "customer_name",
                  })}
                >
                  {renderCell(item, columnKey)}
                </div>
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
