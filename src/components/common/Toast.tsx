import { toast } from "react-toastify";

type ToastType = "success" | "error" | "warning" | "info" | "default";

const iconStyles: Record<ToastType, { icon?: string }> = {
  success: { icon: "fa-circle-check" },
  error: { icon: "fa-circle-xmark" },
  warning: { icon: "fa-triangle-exclamation" },
  info: { icon: "fa-circle-info" },
  default: {},
};

export const showToast = (text: string, type: ToastType = "default") => {
  const { icon } = iconStyles[type];
  const color = "var(--main)";

  toast(
    <div style={{ display: "flex", alignItems: "center" }}>
      {icon && (
        <i
          className={`fa-solid ${icon}`}
          style={{ color, fontSize: "24px", marginRight: "8px" }}
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </div>,
    {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    }
  );
};
