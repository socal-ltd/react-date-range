import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateRange from '../DateRange';
import DefinedRange from '../DefinedRange';
import { findNextRangeIndex, generateStyles } from '../../utils';
import classnames from 'classnames';
import coreStyles from '../../styles';

class DateRangePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedRange: [findNextRangeIndex(props.ranges), 0]
    };
    this.styles = generateStyles([coreStyles, props.classNames]);
    this.applyFunc = props.applyFunc ? props.applyFunc : null;
    this.cancelFunc = props.cancelFunc ? props.cancelFunc : null;
  }
  onApply() {
    if (this.applyFunc) {
      this.applyFunc();
    }
  }
  onCancel() {
    if (this.cancelFunc) {
      this.cancelFunc();
    }
  }
  render() {
    const { focusedRange } = this.state;
    return (
      <div className="Container">
        <div className={classnames(this.styles.dateRangePickerWrapper, this.props.className)}>
          <DefinedRange
            focusedRange={focusedRange}
            onPreviewChange={value => this.dateRange.updatePreview(value)}
            {...this.props}
            range={this.props.ranges[focusedRange[0]]}
            className={undefined}
          />
          <DateRange
            onRangeFocusChange={focusedRange => this.setState({ focusedRange })}
            focusedRange={focusedRange}
            {...this.props}
            ref={t => (this.dateRange = t)}
            className={undefined}
          />
        </div>
        <div className="buttons" style={{ float: 'right', margin: '10px' }}>
          <button>Cancel</button>
          <button>Apply</button>
        </div>
      </div>
    );
  }
}

DateRangePicker.defaultProps = {};

DateRangePicker.propTypes = {
  ...DateRange.propTypes,
  ...DefinedRange.propTypes,
  className: PropTypes.string
};

export default DateRangePicker;
