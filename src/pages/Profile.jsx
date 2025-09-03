import React, { useEffect, useState } from 'react'

const Profile = () => {

  const [user, setUser] = useState(null)
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({
    sureName: user?.sureName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });


  const handleSave = (e) => {
    e.preventDefault();

    if (!editData.sureName.trim() || !editData.lastName.trim() || !editData.email.trim()) {
      alert("All fields must be filled in!");
      return;
    }

    const allUsers = JSON.parse(localStorage.getItem("users")) || [];

    //to check if the email is there
    const emailExists = allUsers.find(
      (u) => u.email === editData.email && u.email !== user.email
    );

    if (emailExists) {
      alert("This email already exists. Please choose another email.");
      return;
    }

    const updatedUsers = allUsers.map((u) =>
      u.email === user.email ? { ...u, ...editData } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUser(editData);
    localStorage.setItem("user", JSON.stringify(editData));

    setEditing(false);
  };


  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  if (!user) {
    return <p className='d-flex justify-content-center text-danger fs-4 mt-5'>User information not found</p>
  }

  return (
    <div>

      <div className="container mt-5">
        <div className="card shadow">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h2 className="mb-0">User Page</h2>
            <button className="btn btn-light btn-sm" onClick={() => setEditing(true)}>
              Edit
            </button>
          </div>
          {!editing ? (
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Sure Name:</strong> {user.sureName}
              </li>
              <li className="list-group-item">
                <strong>Last Name:</strong> {user.lastName}
              </li>
              <li className="list-group-item">
                <strong>Email:</strong> {user.email}
              </li>
            </ul>
          ) : (
            <div className="card-body">
              <form onSubmit={handleSave}>
                <div className="mb-3">
                  <label className="form-label">Sure Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editData.sureName}
                    onChange={(e) => setEditData({ ...editData, sureName: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editData.lastName}
                    onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-success me-2">Save</button>
                <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
              </form>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default Profile