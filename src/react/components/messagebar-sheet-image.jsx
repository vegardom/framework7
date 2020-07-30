import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getDataAttrs, emit } from '../shared/utils';
import { colorClasses } from '../shared/mixins';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  image? : string
  checked? : boolean
  COLOR_PROPS
  onChecked? : (event?: any) => void
  onUnchecked? : (event?: any) => void
  onChange? : (event?: any) => void
*/

const MessagebarSheetImage = forwardRef((props, ref) => {
  const { className, id, style, children, image, checked } = props;
  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);

  const onChange = (event) => {
    if (checked) emit(props, 'checked', event);
    else emit(props, 'unchecked', event);
    emit(props, 'change', event);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const classes = classNames(className, 'messagebar-sheet-image', 'checkbox', colorClasses(props));
  const styles = {
    backgroundImage: image && `url(${image})`,
    ...(style || {}),
  };

  return (
    <label id={id} className={classes} style={styles} ref={elRef} {...dataAttrs}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <i className="icon icon-checkbox" />
      {children}
    </label>
  );
});

MessagebarSheetImage.displayName = 'f7-messagebar-sheet-image';

export default MessagebarSheetImage;