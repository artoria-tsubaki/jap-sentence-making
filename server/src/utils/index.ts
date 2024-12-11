import { SqlParams } from "src/interface";

export function concatSqlWhereParams(params: SqlParams[]): string {
  let sqlWhere = '';
  let i = 0;
  params.forEach((item) => {
    if(item.value) {
      if (i === 0) {
        sqlWhere += ` WHERE ${item.sql}`
      } else {
        sqlWhere += ` AND ${item.sql}`
      }
      i++;
    }
  })
  return sqlWhere
}