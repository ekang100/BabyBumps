import styles from './standardInput.module.css';

const StandardInput = ({ 
  type = 'text',
  value,
  onChange,
  placeholder,
  className,
  ...props
}) => {
  const isTextarea = type === 'textarea';
  const Component = isTextarea ? 'textarea' : 'input';
  
  return (
    <Component
      type={type !== 'textarea' ? type : undefined}
      className={`${styles[isTextarea ? 'textarea' : 'input']} ${className || ''}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default StandardInput; 