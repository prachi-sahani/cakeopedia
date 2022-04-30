import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDBdata } from "../context/db-data-context";
import { useMessageHandling } from "../context/message-handling-context";
import "../stylesheets/view-notes.css";
import { Loader } from "./Loader";
export function ViewNotes() {
  const { gridView } = useMessageHandling();
  const { getNotes, notes, notesLoading } = useDBdata();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (sessionStorage.getItem("uid")) {
      if (!notes) {
        getNotes();
      }
    } else {
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, []);

  return (
    <main className="view-notes">
      {notesLoading && <Loader />}
      <div className="notes grid-container grid-3">
        {notes &&
          notes.map((note, index) => (
            <div
              key={index}
              className={`note grid-item card card-basic ${
                gridView ? "col-1" : "col-3"
              } col-sm-3`}
            >
              <div className="card-header">
                <div className="card-title note-title">{note.title}</div>
              </div>
              <div className="card-content note-content">
                {note.description}
              </div>
              <div className="card-footer note-footer">
                <div className="action-icons">
                  <button className="btn-icon material-icons ">
                    color_lens
                  </button>
                  <button className="btn-icon material-icons ">
                    content_copy
                  </button>
                  <button className="btn-icon material-icons ">archive</button>
                  <button className="btn-icon material-icons ">delete</button>
                </div>
              </div>
            </div>
          ))}

        {/* <div className={`note grid-item card card-basic ${gridView ? "col-1" : "col-3" } col-sm-3`}>
          <div className="card-header">
            <div className="card-title note-title">Cake Recipe</div>
          </div>
          <div className="card-content note-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            repudiandae sapiente corporis vitae? Iure quidem obcaecati esse
            itaque ullam minima...
          </div>
          <div className="card-footer note-footer">
            <div className="action-icons">
              <button className="btn-icon material-icons ">color_lens</button>
              <button className="btn-icon material-icons ">content_copy</button>
              <button className="btn-icon material-icons ">archive</button>
              <button className="btn-icon material-icons ">delete</button>
            </div>
          </div>
        </div>

        <div className={`note grid-item card card-basic ${gridView ? "col-1" : "col-3" } col-sm-3`}>
          <div className="card-header">
            <div className="card-title note-title">Cake Recipe</div>
          </div>
          <div className="card-content note-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            repudiandae sapiente corporis vitae? Iure quidem obcaecati esse
            itaque ullam minima...
          </div>
          <div className="card-footer note-footer">
            <div className="action-icons">
              <button className="btn-icon material-icons ">color_lens</button>
              <button className="btn-icon material-icons ">content_copy</button>
              <button className="btn-icon material-icons ">archive</button>
              <button className="btn-icon material-icons ">delete</button>
            </div>
          </div>
        </div>

        <div className={`note grid-item card card-basic ${gridView ? "col-1" : "col-3" } col-sm-3`}>
          <div className="card-header">
            <div className="card-title">Cake Recipe</div>
          </div>
          <div className="card-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            repudiandae sapiente corporis vitae? Iure quidem obcaecati esse
            itaque ullam minima...
          </div>
          <div className="card-footer note-footer">
            <div className="action-icons">
              <button className="btn-icon material-icons ">color_lens</button>
              <button className="btn-icon material-icons ">content_copy</button>
              <button className="btn-icon material-icons ">archive</button>
              <button className="btn-icon material-icons ">delete</button>
            </div>
          </div>
        </div>

        <div className={`note grid-item card card-basic ${gridView ? "col-1" : "col-3" } col-sm-3`}>
          <div className="card-header">
            <div className="card-title">Cake Recipe</div>
          </div>
          <div className="card-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            repudiandae sapiente corporis vitae? Iure quidem obcaecati esse
            itaque ullam minima...
          </div>
          <div className="card-footer note-footer">
            <div className="action-icons">
              <button className="btn-icon material-icons ">color_lens</button>
              <button className="btn-icon material-icons ">content_copy</button>
              <button className="btn-icon material-icons ">archive</button>
              <button className="btn-icon material-icons ">delete</button>
            </div>
          </div>
        </div>

        <div className={`note grid-item card card-basic ${gridView ? "col-1" : "col-3" } col-sm-3`}>
          <div className="card-header">
            <div className="card-title">Cake Recipe</div>
          </div>
          <div className="card-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            repudiandae sapiente corporis vitae? Iure quidem obcaecati esse
            itaque ullam minima...
          </div>
          <div className="card-footer note-footer">
            <div className="action-icons">
              <button className="btn-icon material-icons ">color_lens</button>
              <button className="btn-icon material-icons ">content_copy</button>
              <button className="btn-icon material-icons ">archive</button>
              <button className="btn-icon material-icons ">delete</button>
            </div>
          </div>
        </div>

        <div className={`note grid-item card card-basic ${gridView ? "col-1" : "col-3" } col-sm-3`}>
          <div className="card-header">
            <div className="card-title">Cake Recipe</div>
          </div>
          <div className="card-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            repudiandae sapiente corporis vitae? Iure quidem obcaecati esse
            itaque ullam minima...
          </div>
          <div className="card-footer note-footer">
            <div className="action-icons">
              <button className="btn-icon material-icons ">color_lens</button>
              <button className="btn-icon material-icons ">content_copy</button>
              <button className="btn-icon material-icons ">archive</button>
              <button className="btn-icon material-icons ">delete</button>
            </div>
          </div>
        </div> */}
      </div>
      <button className="add-note btn-fab btn-primary material-icons">
        add
      </button>
    </main>
  );
}
