import React from 'react';
import Table from 'react-bootstrap/Table';

export default function Projects({projects, deleteProject, editProject }) {
    return(
        <Table hover variant="dark" size="sm" className="table" >
        <thead className="tablehead">
            <tr>
            <th>ID</th>
            <th>Title</th>
            <th colSpan="2"></th>
            </tr>
        </thead>
        <tbody>
            {projects.map(project => (
                <tr key={project.id}>
                    <td>{project.id}</td>
                    <td>{project.title}</td>
                    <td className="table-buttons">
                        <button onClick={() => editProject(project)} >Edit</button>
                        <button onClick={() => deleteProject(project.id)} >Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
        </Table>
    )
}
