
import Grid from '../Grid';
import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';

/**
 * It is inefficient to create and manage a large list of DOM elements within a scrolling container
 * if only a few of those elements are visible. The primary purpose of this component is to improve
 * performance by only rendering the DOM nodes that a user is able to see based on their current
 * scroll position.
 *
 * This component renders a virtualized list of elements with either fixed or dynamic heights.
 */

var VirtualScroll = function (_Component) {
  babelHelpers.inherits(VirtualScroll, _Component);

  function VirtualScroll() {
    babelHelpers.classCallCheck(this, VirtualScroll);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(VirtualScroll).apply(this, arguments));
  }

  babelHelpers.createClass(VirtualScroll, [{
    key: 'measureAllRows',


    /** See Grid#measureAllCells */
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
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var estimatedRowSize = _props.estimatedRowSize;
      var height = _props.height;
      var noRowsRenderer = _props.noRowsRenderer;
      var onRowsRendered = _props.onRowsRendered;
      var _onScroll = _props.onScroll;
      var rowHeight = _props.rowHeight;
      var rowRenderer = _props.rowRenderer;
      var overscanRowCount = _props.overscanRowCount;
      var rowCount = _props.rowCount;
      var scrollToAlignment = _props.scrollToAlignment;
      var scrollToIndex = _props.scrollToIndex;
      var scrollTop = _props.scrollTop;
      var style = _props.style;
      var width = _props.width;


      var classNames = cn('VirtualScroll', className);

      return React.createElement(Grid, {
        ref: 'Grid',
        'aria-label': this.props['aria-label'],
        className: classNames,
        cellRenderer: function cellRenderer(_ref) {
          var columnIndex = _ref.columnIndex;
          var isScrolling = _ref.isScrolling;
          var rowIndex = _ref.rowIndex;
          return rowRenderer({
            index: rowIndex,
            isScrolling: isScrolling
          });
        },
        columnWidth: width,
        columnCount: 1,
        estimatedRowSize: estimatedRowSize,
        height: height,
        noContentRenderer: noRowsRenderer,
        onScroll: function onScroll(_ref2) {
          var clientHeight = _ref2.clientHeight;
          var scrollHeight = _ref2.scrollHeight;
          var scrollTop = _ref2.scrollTop;
          return _onScroll({ clientHeight: clientHeight, scrollHeight: scrollHeight, scrollTop: scrollTop });
        },
        onSectionRendered: function onSectionRendered(_ref3) {
          var rowOverscanStartIndex = _ref3.rowOverscanStartIndex;
          var rowOverscanStopIndex = _ref3.rowOverscanStopIndex;
          var rowStartIndex = _ref3.rowStartIndex;
          var rowStopIndex = _ref3.rowStopIndex;
          return onRowsRendered({
            overscanStartIndex: rowOverscanStartIndex,
            overscanStopIndex: rowOverscanStopIndex,
            startIndex: rowStartIndex,
            stopIndex: rowStopIndex
          });
        },
        overscanRowCount: overscanRowCount,
        rowHeight: rowHeight,
        rowCount: rowCount,
        scrollToAlignment: scrollToAlignment,
        scrollToRow: scrollToIndex,
        scrollTop: scrollTop,
        style: style,
        width: width
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState);
    }
  }]);
  return VirtualScroll;
}(Component);

VirtualScroll.propTypes = {
  'aria-label': PropTypes.string,

  /** Optional CSS class name */
  className: PropTypes.string,

  /**
   * Used to estimate the total height of a VirtualScroll before all of its rows have actually been measured.
   * The estimated total height is adjusted as rows are rendered.
   */
  estimatedRowSize: PropTypes.number.isRequired,

  /** Height constraint for list (determines how many actual rows are rendered) */
  height: PropTypes.number.isRequired,

  /** Optional renderer to be used in place of rows when rowCount is 0 */
  noRowsRenderer: PropTypes.func.isRequired,

  /**
   * Callback invoked with information about the slice of rows that were just rendered.
   * ({ startIndex, stopIndex }): void
   */
  onRowsRendered: PropTypes.func.isRequired,

  /**
   * Number of rows to render above/below the visible bounds of the list.
   * These rows can help for smoother scrolling on touch devices.
   */
  overscanRowCount: PropTypes.number.isRequired,

  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   * ({ clientHeight, scrollHeight, scrollTop }): void
   */
  onScroll: PropTypes.func.isRequired,

  /**
   * Either a fixed row height (number) or a function that returns the height of a row given its index.
   * ({ index: number }): number
   */
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,

  /** Responsbile for rendering a row given an index; ({ index: number }): node */
  rowRenderer: PropTypes.func.isRequired,

  /** Number of rows in list. */
  rowCount: PropTypes.number.isRequired,

  /** See Grid#scrollToAlignment */
  scrollToAlignment: PropTypes.oneOf(['auto', 'end', 'start', 'center']).isRequired,

  /** Row index to ensure visible (by forcefully scrolling if necessary) */
  scrollToIndex: PropTypes.number,

  /** Vertical offset. */
  scrollTop: PropTypes.number,

  /** Optional inline style */
  style: PropTypes.object,

  /** Width of list */
  width: PropTypes.number.isRequired
};
VirtualScroll.defaultProps = {
  estimatedRowSize: 30,
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
  scrollToAlignment: 'auto',
  style: {}
};
export default VirtualScroll;