import { toast } from "react-toastify";

type ToastType = "success" | "error" | "warning" | "info" | "default";

export const showToast = (text: string, type: ToastType = "default") => {
  const iconStyles = {
    success: { color: "var(--main)", icon: "fa-circle-check" },
    error: { color: "var(--main)", icon: "fa-circle-xmark" },
    warning: { color: "var(--main)", icon: "fa-triangle-exclamation" },
    info: { color: "var(--main)", icon: "fa-circle-info" },
    default: { color: "var(--main)", icon: undefined },
  };

  const { color, icon } = iconStyles[type];

  toast(
    <div style={{ display: "flex", alignItems: "center" }}>
      {icon && (
        <i
          className={`fa-solid ${icon}`}
          style={{ color, fontSize: "24px", marginRight: "8px" }}
        ></i>
      )}
      {text}
    </div>,
    {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }
  );
};
