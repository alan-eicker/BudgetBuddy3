import CircularProgress from '@mui/material/CircularProgress';

const WithLoading = <T,>(Component: React.ComponentType<T>) => {
  const WihLoadingComponent = (
    props: T & {
      isLoading: boolean;
    },
  ) => {
    return (
      <>
        {props.isLoading && <CircularProgress />}
        <Component {...props} />
      </>
    );
  };

  return WihLoadingComponent;
};

export default WithLoading;
