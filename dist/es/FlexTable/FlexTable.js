
import cn from 'classnames';
import FlexColumn from './FlexColumn';
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import shallowCompare from 'react-addons-shallow-compare';
import Grid from '../Grid';
import SortDirection from './SortDirection';

/**
 * Table component with fixed headers and virtualized rows for improved performance with large data sets.
 * This component expects explicit width, height, and padding parameters.
 */

var FlexTable = function (_Component) {
  babelHelpers.inherits(FlexTable, _Component);

  function FlexTable(props) {
    babelHelpers.classCallCheck(this, FlexTable);

    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(FlexTable).call(this, props));

    _this.state = {
      scrollbarWidth: 0
    };

    _this._createRow = _this._createRow.bind(_this);
    return _this;
  }

  /** See Grid#measureAllCells */


  babelHelpers.createClass(FlexTable, [{
    key: 'measureAllRows',
    value: function measureAllRows() {
      this.refs.Grid.measureAllCells();
    }

    /** See Grid#recomputeGridSize */

  }, {
    key: 'recomputeRowHeights',
    value: function recomputeRowHeights() {
      this.refs.Grid.recomputeGridSize();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._setScrollbarWidth();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._setScrollbarWidth();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var className = _props.className;
      var disableHeader = _props.disableHeader;
      var estimatedRowSize = _props.estimatedRowSize;
      var headerHeight = _props.headerHeight;
      var height = _props.height;
      var noRowsRenderer = _props.noRowsRenderer;
      var onRowsRendered = _props.onRowsRendered;
      var _onScroll = _props.onScroll;
      var overscanRowCount = _props.overscanRowCount;
      var rowClassName = _props.rowClassName;
      var rowHeight = _props.rowHeight;
      var rowCount = _props.rowCount;
      var rowStyle = _props.rowStyle;
      var scrollToAlignment = _props.scrollToAlignment;
      var scrollToIndex = _props.scrollToIndex;
      var scrollTop = _props.scrollTop;
      var style = _props.style;
      var width = _props.width;
      var scrollbarWidth = this.state.scrollbarWidth;


      var availableRowsHeight = height - headerHeight;

      // This row-renderer wrapper function is necessary in order to trigger re-render when the
      // sort-by or sort-direction have changed (else Grid will not see any props changes)
      var rowRenderer = function rowRenderer(_ref) {
        var index = _ref.index;
        var isScrolling = _ref.isScrolling;

        return _this2._createRow({
          index: index,
          isScrolling: isScrolling
        });
      };

      var rowClass = rowClassName instanceof Function ? rowClassName({ index: -1 }) : rowClassName;

      return React.createElement(
        'div',
        {
          className: cn('FlexTable', className),
          style: style
        },
        !disableHeader && React.createElement(
          'div',
          {
            className: cn('FlexTable__headerRow', rowClass),
            style: babelHelpers.extends({}, rowStyle, {
              height: headerHeight,
              paddingRight: scrollbarWidth,
              width: width
            })
          },
          this._getRenderedHeaderRow()
        ),
        React.createElement(Grid, {
          'aria-label': this.props['aria-label'],
          className: 'FlexTable__Grid',
          cellRenderer: function cellRenderer(_ref2) {
            var columnIndex = _ref2.columnIndex;
            var isScrolling = _ref2.isScrolling;
            var rowIndex = _ref2.rowIndex;
            return rowRenderer({
              index: rowIndex,
              isScrolling: isScrolling
            });
          },
          columnWidth: width,
          columnCount: 1,
          estimatedRowSize: estimatedRowSize,
          height: availableRowsHeight,
          noContentRenderer: noRowsRenderer,
          onScroll: function onScroll(_ref3) {
            var clientHeight = _ref3.clientHeight;
            var scrollHeight = _ref3.scrollHeight;
            var scrollTop = _ref3.scrollTop;
            return _onScroll({ clientHeight: clientHeight, scrollHeight: scrollHeight, scrollTop: scrollTop });
          },
          onSectionRendered: function onSectionRendered(_ref4) {
            var rowOverscanStartIndex = _ref4.rowOverscanStartIndex;
            var rowOverscanStopIndex = _ref4.rowOverscanStopIndex;
            var rowStartIndex = _ref4.rowStartIndex;
            var rowStopIndex = _ref4.rowStopIndex;
            return onRowsRendered({
              overscanStartIndex: rowOverscanStartIndex,
              overscanStopIndex: rowOverscanStopIndex,
              startIndex: rowStartIndex,
              stopIndex: rowStopIndex
            });
          },
          overscanRowCount: overscanRowCount,
          ref: 'Grid',
          rowHeight: rowHeight,
          rowCount: rowCount,
          scrollToAlignment: scrollToAlignment,
          scrollToRow: scrollToIndex,
          scrollTop: scrollTop,
          width: width
        })
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState);
    }
  }, {
    key: '_createColumn',
    value: function _createColumn(_ref5) {
      var column = _ref5.column;
      var columnIndex = _ref5.columnIndex;
      var isScrolling = _ref5.isScrolling;
      var rowData = _ref5.rowData;
      var rowIndex = _ref5.rowIndex;
      var _column$props = column.props;
      var cellDataGetter = _column$props.cellDataGetter;
      var cellRenderer = _column$props.cellRenderer;
      var className = _column$props.className;
      var columnData = _column$props.columnData;
      var dataKey = _column$props.dataKey;
      var cellStyle = _column$props.style;


      var cellData = cellDataGetter({ columnData: columnData, dataKey: dataKey, rowData: rowData });
      var renderedCell = cellRenderer({ cellData: cellData, columnData: columnData, dataKey: dataKey, isScrolling: isScrolling, rowData: rowData, rowIndex: rowIndex });

      var style = this._getFlexStyleForColumn(column, cellStyle);

      var title = typeof renderedCell === 'string' ? renderedCell : null;

      return React.createElement(
        'div',
        {
          key: 'Row' + rowIndex + '-Col' + columnIndex,
          className: cn('FlexTable__rowColumn', className),
          style: style
        },
        React.createElement(
          'div',
          {
            className: 'FlexTable__truncatedColumnText',
            title: title
          },
          renderedCell
        )
      );
    }
  }, {
    key: '_createHeader',
    value: function _createHeader(column, columnIndex) {
      var _props2 = this.props;
      var headerClassName = _props2.headerClassName;
      var headerStyle = _props2.headerStyle;
      var onHeaderClick = _props2.onHeaderClick;
      var sort = _props2.sort;
      var sortBy = _props2.sortBy;
      var sortDirection = _props2.sortDirection;
      var _column$props2 = column.props;
      var dataKey = _column$props2.dataKey;
      var disableSort = _column$props2.disableSort;
      var headerRenderer = _column$props2.headerRenderer;
      var label = _column$props2.label;
      var columnData = _column$props2.columnData;

      var sortEnabled = !disableSort && sort;

      var classNames = cn('FlexTable__headerColumn', headerClassName, column.props.headerClassName, {
        'FlexTable__sortableHeaderColumn': sortEnabled
      });
      var style = this._getFlexStyleForColumn(column, headerStyle);

      var renderedHeader = headerRenderer({
        columnData: columnData,
        dataKey: dataKey,
        disableSort: disableSort,
        label: label,
        sortBy: sortBy,
        sortDirection: sortDirection
      });

      var a11yProps = {};

      if (sortEnabled || onHeaderClick) {
        (function () {
          // If this is a sortable header, clicking it should update the table data's sorting.
          var newSortDirection = sortBy !== dataKey || sortDirection === SortDirection.DESC ? SortDirection.ASC : SortDirection.DESC;

          var onClick = function onClick() {
            sortEnabled && sort({
              sortBy: dataKey,
              sortDirection: newSortDirection
            });
            onHeaderClick && onHeaderClick({ columnData: columnData, dataKey: dataKey });
          };

          var onKeyDown = function onKeyDown(event) {
            if (event.key === 'Enter' || event.key === ' ') {
              onClick();
            }
          };

          a11yProps['aria-label'] = column.props['aria-label'] || label || dataKey;
          a11yProps.role = 'rowheader';
          a11yProps.tabIndex = 0;
          a11yProps.onClick = onClick;
          a11yProps.onKeyDown = onKeyDown;
        })();
      }

      return React.createElement(
        'div',
        babelHelpers.extends({}, a11yProps, {
          key: 'Header-Col' + columnIndex,
          className: classNames,
          style: style
        }),
        renderedHeader
      );
    }
  }, {
    key: '_createRow',
    value: function _createRow(_ref6) {
      var _this3 = this;

      var index = _ref6.index;
      var isScrolling = _ref6.isScrolling;
      var _props3 = this.props;
      var children = _props3.children;
      var onRowClick = _props3.onRowClick;
      var rowClassName = _props3.rowClassName;
      var rowGetter = _props3.rowGetter;
      var rowStyle = _props3.rowStyle;
      var scrollbarWidth = this.state.scrollbarWidth;


      var rowClass = rowClassName instanceof Function ? rowClassName({ index: index }) : rowClassName;
      var rowData = rowGetter({ index: index });

      var renderedRow = React.Children.toArray(children).map(function (column, columnIndex) {
        return _this3._createColumn({
          column: column,
          columnIndex: columnIndex,
          isScrolling: isScrolling,
          rowData: rowData,
          rowIndex: index
        });
      });

      var a11yProps = {};

      if (onRowClick) {
        a11yProps['aria-label'] = 'row';
        a11yProps.role = 'row';
        a11yProps.tabIndex = 0;
        a11yProps.onClick = function () {
          return onRowClick({ index: index });
        };
      }

      return React.createElement(
        'div',
        babelHelpers.extends({}, a11yProps, {
          key: index,
          className: cn('FlexTable__row', rowClass),
          style: babelHelpers.extends({}, rowStyle, {
            height: this._getRowHeight(index),
            paddingRight: scrollbarWidth
          })
        }),
        renderedRow
      );
    }

    /**
     * Determines the flex-shrink, flex-grow, and width values for a cell (header or column).
     */

  }, {
    key: '_getFlexStyleForColumn',
    value: function _getFlexStyleForColumn(column) {
      var customStyle = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var flexValue = column.props.flexGrow + ' ' + column.props.flexShrink + ' ' + column.props.width + 'px';

      var style = babelHelpers.extends({}, customStyle, {
        flex: flexValue,
        msFlex: flexValue,
        WebkitFlex: flexValue
      });

      if (column.props.maxWidth) {
        style.maxWidth = column.props.maxWidth;
      }

      if (column.props.minWidth) {
        style.minWidth = column.props.minWidth;
      }

      return style;
    }
  }, {
    key: '_getRenderedHeaderRow',
    value: function _getRenderedHeaderRow() {
      var _this4 = this;

      var _props4 = this.props;
      var children = _props4.children;
      var disableHeader = _props4.disableHeader;

      var items = disableHeader ? [] : React.Children.toArray(children);

      return items.map(function (column, index) {
        return _this4._createHeader(column, index);
      });
    }
  }, {
    key: '_getRowHeight',
    value: function _getRowHeight(rowIndex) {
      var rowHeight = this.props.rowHeight;


      return rowHeight instanceof Function ? rowHeight({ index: rowIndex }) : rowHeight;
    }
  }, {
    key: '_setScrollbarWidth',
    value: function _setScrollbarWidth() {
      var Grid = findDOMNode(this.refs.Grid);
      var clientWidth = Grid.clientWidth || 0;
      var offsetWidth = Grid.offsetWidth || 0;
      var scrollbarWidth = offsetWidth - clientWidth;

      this.setState({ scrollbarWidth: scrollbarWidth });
    }
  }]);
  return FlexTable;
}(Component);

FlexTable.propTypes = {
  'aria-label': PropTypes.string,

  /** One or more FlexColumns describing the data displayed in this row */
  children: function children(props, propName, componentName) {
    var children = React.Children.toArray(props.children);
    for (var i = 0; i < children.length; i++) {
      if (children[i].type !== FlexColumn) {
        return new Error('FlexTable only accepts children of type FlexColumn');
      }
    }
  },

  /** Optional CSS class name */
  className: PropTypes.string,

  /** Disable rendering the header at all */
  disableHeader: PropTypes.bool,

  /**
   * Used to estimate the total height of a FlexTable before all of its rows have actually been measured.
   * The estimated total height is adjusted as rows are rendered.
   */
  estimatedRowSize: PropTypes.number.isRequired,

  /** Optional CSS class to apply to all column headers */
  headerClassName: PropTypes.string,

  /** Fixed height of header row */
  headerHeight: PropTypes.number.isRequired,

  /** Fixed/available height for out DOM element */
  height: PropTypes.number.isRequired,

  /** Optional renderer to be used in place of table body rows when rowCount is 0 */
  noRowsRenderer: PropTypes.func,

  /**
  * Optional callback when a column's header is clicked.
  * ({ columnData: any, dataKey: string }): void
  */
  onHeaderClick: PropTypes.func,

  /** Optional custom inline style to attach to table header columns. */
  headerStyle: PropTypes.object,

  /**
   * Callback invoked when a user clicks on a table row.
   * ({ index: number }): void
   */
  onRowClick: PropTypes.func,

  /**
   * Callback invoked with information about the slice of rows that were just rendered.
   * ({ startIndex, stopIndex }): void
   */
  onRowsRendered: PropTypes.func,

  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   * ({ clientHeight, scrollHeight, scrollTop }): void
   */
  onScroll: PropTypes.func.isRequired,

  /**
   * Number of rows to render above/below the visible bounds of the list.
   * These rows can help for smoother scrolling on touch devices.
   */
  overscanRowCount: PropTypes.number.isRequired,

  /**
   * Optional CSS class to apply to all table rows (including the header row).
   * This property can be a CSS class name (string) or a function that returns a class name.
   * If a function is provided its signature should be: ({ index: number }): string
   */
  rowClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  /**
   * Callback responsible for returning a data row given an index.
   * ({ index: number }): any
   */
  rowGetter: PropTypes.func.isRequired,

  /**
   * Either a fixed row height (number) or a function that returns the height of a row given its index.
   * ({ index: number }): number
   */
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,

  /** Number of rows in table. */
  rowCount: PropTypes.number.isRequired,

  /** Optional custom inline style to attach to table rows. */
  rowStyle: PropTypes.object,

  /** See Grid#scrollToAlignment */
  scrollToAlignment: PropTypes.oneOf(['auto', 'end', 'start', 'center']).isRequired,

  /** Row index to ensure visible (by forcefully scrolling if necessary) */
  scrollToIndex: PropTypes.number,

  /** Vertical offset. */
  scrollTop: PropTypes.number,

  /**
   * Sort function to be called if a sortable header is clicked.
   * ({ sortBy: string, sortDirection: SortDirection }): void
   */
  sort: PropTypes.func,

  /** FlexTable data is currently sorted by this :dataKey (if it is sorted at all) */
  sortBy: PropTypes.string,

  /** FlexTable data is currently sorted in this direction (if it is sorted at all) */
  sortDirection: PropTypes.oneOf([SortDirection.ASC, SortDirection.DESC]),

  /** Optional inline style */
  style: PropTypes.object,

  /** Width of list */
  width: PropTypes.number.isRequired
};
FlexTable.defaultProps = {
  disableHeader: false,
  estimatedRowSize: 30,
  headerHeight: 0,
  headerStyle: {},
  noRowsRenderer: function noRowsRenderer() {
    return null;
  },
  onRowsRendered: function onRowsRendered() {
    return null;
  },
  onScroll: function onScroll() {
    return null;
  },
  overscanRowCount: 10,
  rowStyle: {},
  scrollToAlignment: 'auto',
  style: {}
};
export default FlexTable;