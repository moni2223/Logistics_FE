import "./styles.scss"
import { Shared } from '../../../components'
import { ScrollSync } from 'react-virtualized';
import Table from '../Table'
import { cloneElement } from "react";
import { partition } from "lodash";
import { colors } from "../../../config/constants";

const TableWrapper = (props) => {
    const { useColumnsManager, columns, data, ...rest } = props
    const [lockedColumns, restColumns] = partition(columns, ({ value }) => useColumnsManager?.lockedColumns?.map(({ value }) => value).includes(value))

    return <Shared.ConditionalWrapper
        condition={lockedColumns.length}
        wrapper={(children) => <ScrollSync>
            {(scrollProps) => <div className="row row-locked">
                <Table
                    className='table-locked-container'
                    columns={lockedColumns}
                    useColumnsManager={useColumnsManager}
                    data={data}
                    joinRightSide
                    containerStyle={{ position: 'sticky', top: 0, left: 0, backgroundColor: colors.white, zIndex: 1 }}
                    scrollProps={scrollProps}
                    {...(rest.renderCell && { renderCell: rest.renderCell })}
                    {...(rest.onRowClick && { onRowClick: rest.onRowClick })}
                />
                {cloneElement(children, { scrollProps })}
            </div>}
        </ScrollSync>}
    >
        <Table
            columns={restColumns}
            useColumnsManager={useColumnsManager}
            data={data}
            {...rest}
            joinLeftSide={!!lockedColumns.length}
        />
    </Shared.ConditionalWrapper>
}

export default TableWrapper