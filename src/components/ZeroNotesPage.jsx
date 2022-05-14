import { useLocation, useNavigate } from "react-router-dom";

export function ZeroNotesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  let message = "";
  let icon = "";
  let redirectTo = "";
  if (location.pathname.includes("trash")) {
    message = "No notes in trash";
    icon = "delete";
  } else if (location.pathname.includes("archive")) {
    message = "No notes in archive";
    icon = "archive";
  } else {
    message = "Start adding notes";
    icon = "note_add";
    redirectTo = `${location.pathname}/note`;
  }
  return (
    <div className="my-5 txt-center txt-gray">
      <button
        onClick={() =>
          navigate(redirectTo ?? location.pathname, {
            state: { background: location },
          })
        }
        className="btn-link h1 material-icons-outlined"
      >
        {icon}
      </button>
      <h1 className="heading h2">{message}</h1>
    </div>
  );
}
