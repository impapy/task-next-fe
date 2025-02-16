import { Backdrop, CircularProgress } from "@mui/material";

const FullScreenLoading: React.FC<{ status: string }> = ({ status }) => {
  return (
    <div className="w-full min-h-screen centered">
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={status == "pending" && true}
      >
        <CircularProgress sx={{ color: "#007473" }} />
      </Backdrop>
    </div>
  );
};

export default FullScreenLoading;
