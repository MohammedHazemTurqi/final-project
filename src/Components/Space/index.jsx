const Space = ({ width = 0, height = 0, ...props }) => {
  return <div style={{ width, height }} {...props}></div>;
};

export default Space;
