/* eslint-disable */
import { useEffect, useRef, createRef, useMemo, useCallback, forwardRef, useImperativeHandle } from "react"
import PropTypes from 'prop-types'
import { useTable, useFlexLayout, useExpanded, useRowSelect } from "react-table"
import { List, AutoSizer } from 'react-virtualized';
import { isEmpty } from 'lodash'
import Checkbox from "./Checkbox"

import "./styles.scss"
import { useQuery } from "../../../hooks"
import { nanoid } from "nanoid";
import { colors } from "../../../config/constants";

const Table = forwardRef(({
  columns: columnsProp = [],
  data: dataProp = [],
  renderCell,
  initialState = {},
  className = '',
  containerStyle = {},
  emptyState = '',
  outlines = {},
  children = () => { },
  maxExpandHeight = Infinity,
  expandColumn = "objects",
  handlePagination = () => { },

  fixedWidth = false,
  rowHeight: rowHeightProp = 45,
  rowMargin = 8,
  headerHight = 50,

  joinLeftSide = false,
  joinRightSide = false,
  scrollProps,

  useCheckboxes = false,
  allowSingle = false,
  hideSelectAll = false,
  selectedCheckboxes = [],
  disabledCheckboxes = [],
  onCheckboxChange = () => { },
  onCheckboxClick = () => { },
  onCheckboxClickAll = () => { },
  useColumnsManager = null,

  onRowClick,
},

  ref
) => {
  const columns = useMemo(() => columnsProp.map((col, i) => ({
    ...col,
    Header: col.label,
    accessor: col.value || `col-${i}`,
    width: col.size || 300,
    id: col.value || `col-${i}`,
  })), [columnsProp])
  const data = useMemo(() => dataProp || [], [dataProp])
  const getRowId = useCallback(({ _id }, relativeIndex) => _id || relativeIndex, [])
  const {
    state,
    headerGroups,
    rows,
    getTableProps,
    getTableBodyProps,
    prepareRow,
    totalColumnsWidth,
    toggleHideColumn,
    toggleRowExpanded,
    toggleAllRowsExpanded,
    toggleAllRowsSelected,
    isAllRowsSelected,
  } = useTable(
    {
      columns,
      data,
      initialState,
      autoResetHiddenColumns: false,
      expandSubRows: false,
      autoResetExpanded: false,
      autoResetSelectedRows: false,
      getRowId,
      stateReducer: (newState, action, oldState) => {
        switch (action.type) {
          case "toggleAllRowsSelected":
            const selectedRows = data.filter(({ _id }) => !disabledCheckboxes.includes(_id))
            if (onCheckboxClickAll) onCheckboxClickAll(selectedRows)
            if (isEmpty(selectedCheckboxes)) onCheckboxChange(selectedRows.map(({ _id }) => _id))
            else onCheckboxChange([])
            return oldState
          case "toggleRowSelected":
            const row = data.find(({ _id }) => _id === action.id)
            if (onCheckboxClick) onCheckboxClick(row)
            if (selectedCheckboxes.includes(action.id)) onCheckboxChange(allowSingle ? [] : selectedCheckboxes.filter(_id => _id !== action.id))
            else onCheckboxChange(allowSingle ? [action.id] : [...selectedCheckboxes, action.id])
            return oldState
          default:
            return newState
        }
      },
      useControlledState: state => {
        return useMemo(
          () => {
            return ({ ...state, selectedRowIds: selectedCheckboxes.reduce((acc, r) => ({ ...acc, [r]: true }), {}), })
          }, [state, selectedCheckboxes]
        )
      },
    },
    useFlexLayout,
    useExpanded,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        { id: 'selection', value: 'selection', width: 45, },
        ...columns,
      ])
    }
  )
  useImperativeHandle(ref, () => ({
    state,
    toggleRowExpanded: (_id) => {
      const { id, isExpanded } = rows?.find(({ original }) => original._id === _id) || {}
      toggleRowExpanded(id, !isExpanded)
    },
    setRowExpanded: (id, value) => toggleRowExpanded(id, value),
    toggleAllRowsExpanded: () => toggleAllRowsExpanded(false),
    toggleAllRowsSelected
  }), [rows, state])

  useEffect(() => {
    toggleHideColumn('selection', !useCheckboxes)
  }, [useCheckboxes])

  const scrollBarSize = useMemo(() => {
    const scrollDiv = document.createElement('div')
    scrollDiv.setAttribute('style', 'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;')
    document.body.appendChild(scrollDiv)
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    document.body.removeChild(scrollDiv)
    return scrollbarWidth
  }, [])

  const listRef = createRef()
  const rowHeight = useMemo(() => rowHeightProp + rowMargin, [rowHeightProp, rowMargin])
  const rowHeights = useMemo(() => rows?.map(({ isExpanded, original, ...o }) => {
    return isExpanded ? (rowHeight + headerHight + Math.min(maxExpandHeight, (original?.[expandColumn]?.length || 1) * rowHeight) + scrollBarSize) : rowHeight
  }), [rows, expandColumn])

  useEffect(() => {
    listRef?.current?.recomputeRowHeights(0)
  }, [rowHeights])

  const containerRef = useRef(null)

  const { sortBy: sortParam = '{}', filter: filterParam = '{}' } = useQuery()
  const activeFilters = useMemo(() => {
    const sortBy = JSON.parse(sortParam)
    const filter = JSON.parse(filterParam)

    return [...Object.keys(sortBy), ...Object.keys(filter)]
  }, [sortParam, filterParam])

  const RenderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index]
      prepareRow(row)
      const { key: rowKey, ...rowProps } = row.getRowProps()
      return (
        <div
          key={rowKey}
          style={{ ...style, paddingTop: rowMargin / 2 }}
          className={`table-row-container ${row.isExpanded && 'active'} !scrollbar-thin`}
        >
          <div
            {...rowProps}
            className={`table-row-inner-container row ${`table-row-inner-container-${index}`} ${outlines[row.id] ? ' outlined' : ''}${onRowClick ? ' onRowClick' : ''}`}
            style={{
              height: rowHeightProp,
              maxHeight: rowHeightProp,
              outline: Object.keys(state.selectedRowIds).includes(row.id) ? `1px solid ${colors.green}` : outlines[row.id] ? `1px solid ${outlines[row.id]}` : null
            }}
            {...(onRowClick && {
              onClick: () => onRowClick(row.original),
              onMouseEnter: () => document.querySelectorAll(`.table-row-inner-container-${index}`).forEach((node) => node.style.backgroundColor = colors.blueLight),
              onMouseLeave: () => document.querySelectorAll(`.table-row-inner-container-${index}`).forEach((node) => node.style.backgroundColor = ''),
            })}

          >
            {row.cells.map(cell => {
              if (cell.column.id === 'selection') {
                if (!useCheckboxes) return null
                const { key: cellKey, ...cellProps } = cell.getCellProps()
                return <div
                  key={cellKey}
                  {...cellProps}
                  className={`table-row-cell row table-cell-container ${cell.column.value}`}
                  style={fixedWidth ? { ...cellProps.style, width: 'auto', maxWidth: 45 } : { ...cellProps.style, }}
                >
                  <Checkbox
                    row={row.id}
                    {...row.getToggleRowSelectedProps()}
                    disabled={disabledCheckboxes.includes(row.id)}
                  />
                </div>
              } else {
                const { key: cellKey, ...cellProps } = cell.getCellProps()
                return <div
                  key={cellKey}
                  {...cellProps}
                  className={`table-row-cell row table-cell-container ${cell.column.value}`}
                  style={fixedWidth ? { ...cellProps.style, width: 'auto', flexBasis: '0' } : { ...cellProps.style, flexBasis: 'auto' }}
                >
                  {renderCell
                    ? renderCell(cell.row.original, cell.column.id, { index: row.index, isExpanded: row.isExpanded })
                    : ['string', 'number'].includes(typeof cell.row.original[cell.column.id])
                      ? cell.row.original[cell.column.id]
                      : '--'}
                </div>
              }
            })}
          </div>
          <div className={`table-row-children-container`} style={{ height: style.height - rowHeight + 2, marginBottom: rowMargin }}>
            {row.isExpanded ? children({ row }) : null}
          </div>
        </div >
      )
    },
    [prepareRow, rows, state]
  )

  const instanceId = nanoid()

  return <div
    {...getTableProps()}
    ref={containerRef}
    className={`table-container table-container-${instanceId}${className ? ` ${className}` : ''}${joinLeftSide ? ' joinLeftSide' : ''}${joinRightSide ? ' joinRightSide' : ''}`}
    style={{
      minWidth: joinRightSide || joinLeftSide ? totalColumnsWidth : 0,
      height: rows.length ? rows.length * rowHeight + headerHight + scrollBarSize : '100%',
      ...containerStyle
    }}
  >
    <AutoSizer style={{ width: 'auto', height: '100%' }}>
      {({ height, width }) => {
        return <>
          {headerGroups.map(headerGroup => {
            const { key: headerGroupKey, ...headerGroupProps } = headerGroup.getHeaderGroupProps()
            return <div
              key={headerGroupKey}
              {...headerGroupProps}
              className="table-header"
              style={{ ...headerGroupProps.style, height: headerHight, width: fixedWidth ? 'auto' : totalColumnsWidth }}
            >
              {headerGroup.headers.map(({ value, label, sortable, ...column }, headersIndex, headersArray) => {
                if (column.id === 'selection') {
                  if (!useCheckboxes) return null
                  const modifiedOnChange = (event) => rows.forEach((row) => { if (!disabledCheckboxes.includes(row.id)) toggleAllRowsSelected(event.currentTarget.checked) })
                  let selectableRows = 0
                  let selectedRows = 0
                  rows.forEach((row) => { if (row.isSelected) selectedRows++; if (!disabledCheckboxes.includes(row.id)) selectableRows++ })
                  const { key: headerKey, ...headerProps } = column.getHeaderProps()
                  return (
                    <div
                      key={headerKey}
                      {...headerProps}
                      className={`table-cell-container ${value} row`}
                      style={fixedWidth ? { ...headerProps.style, width: 'auto', maxWidth: 45 } : { ...headerProps.style }}
                    >
                      <Checkbox
                        row={{ id: `header-${Math.random()}` }}
                        onChange={modifiedOnChange}
                        disabled={selectableRows === 0}
                        checked={(isAllRowsSelected || selectableRows === selectedRows) && selectableRows !== 0}
                        isHidden={hideSelectAll || allowSingle}
                      />
                    </div>
                  )
                } else {
                  const { key: headerKey, ...headerProps } = column.getHeaderProps()
                  return <div
                    key={headerKey}
                    {...headerProps}
                    className={`table-cell-container ${value} row ${(activeFilters.includes(sortable?.filterKey || value) || activeFilters.includes(sortable?.sortKey || value) || activeFilters.some((activeFilter) => sortable?.allowFilter?.datesRoot?.includes(activeFilter))) && "active"}`}
                    style={fixedWidth ? { ...headerProps.style, width: 'auto', flexBasis: '0' } : { ...headerProps.style, ...(headersIndex === headersArray.length - 1 ? { flex: 'unset' } : { flexBasis: 'auto' }) }}
                  >
                    <span>{label}</span>
                  </div>
                }
              })}
            </div>
          })}
          {rows.length ?
            <div
              {...getTableBodyProps()}
              className="table-content"
              style={{ ...getTableBodyProps().style, height: height - headerHight - scrollBarSize }}>
              <List
                ref={listRef}
                {...(scrollProps && { ...scrollProps })}
                height={height - headerHight - scrollBarSize}
                width={fixedWidth ? width : totalColumnsWidth + scrollBarSize}
                rowCount={rows.length}
                rowHeight={({ index }) => rowHeights[index]}
                rowRenderer={RenderRow}
                onRowsRendered={({ overscanStopIndex }) => { if (handlePagination && overscanStopIndex > rows?.length - 4) handlePagination() }}
              />
            </div>
            : <div style={{ height: height - headerHight }} className="table-content-empty row">{emptyState}</div>}
        </>
      }}
    </AutoSizer>
  </div >
})

export default Table

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  renderCell: PropTypes.func,
  initialState: PropTypes.object,
  className: PropTypes.string,
  containerStyle: PropTypes.object,
  emptyState: PropTypes.node,
  outlines: PropTypes.objectOf(PropTypes.string.isRequired),
  children: PropTypes.func,
  handlePagination: PropTypes.func,

  fixedWidth: PropTypes.bool,
  rowHeight: PropTypes.number,
  rowMargin: PropTypes.number,
  headerHight: PropTypes.number,
  joinLeftSide: PropTypes.bool,
  joinRightSide: PropTypes.bool,

  useCheckboxes: PropTypes.bool,
  allowSingle: PropTypes.bool,
  hideSelectAll: PropTypes.bool,
  selectedCheckboxes: PropTypes.array,
  disabledCheckboxes: PropTypes.array,
  onCheckboxChange: PropTypes.func,
  onCheckboxClick: PropTypes.func,
  onCheckboxClickAll: PropTypes.func,
}