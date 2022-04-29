import React from 'react'

const Formulario = () => {
    const [identificacion, setIde] = React.useState("");
    const [nombre, setNombre] = React.useState("");
    const [direccion, setDir] = React.useState("");
    const [celular, setCel] = React.useState("");
    const [universidad, setUni] = React.useState("");
    const [ListaEstu, setLista] = React.useState([]);
    var imagenes = 'https://picsum.photos/500/300';
    const guardarUsuario = (e) => {
        e.preventDefault()
        if (!identificacion.trim()) {
            alert('Digite identificación')
        }
        if (!nombre.trim()) {
            alert('Digite nombre')
        }
        if (!direccion.trim()) {
            alert('Digite dirección')
        }
        if (!celular.trim()) {
            alert('Digite celular')
        }
        if (!universidad.trim()) {
            alert('Digite Universidad')
        }
        imagenes = ('https://picsum.photos/500/300')
        setLista([
            ...ListaEstu,
            { ID: identificacion, Nombre: nombre, Dir: direccion, Cel: celular, Uni: universidad }
        ])

        e.target.reset()
        setIde('')
        setNombre('')
        setDir('')
        setCel('')
        setUni('')
        imagenes = ('')
    }


    return (
        <div className='container mt-5'>
            <h1 className='text-center'>Formulario</h1>
            <br />
            <div className='row'>
                <div className='col-8'>
                    <ul className='list-group'>
                        {
                            ListaEstu.map(item => (
                                <li className="list-group-item" key={item.ID}>
                                    <img src={imagenes} alt="nombre" /><br />
                                    <span className="lead">Identificación: {item.ID} <br /> Nombre: {item.Nombre} <br /> Dirección: {item.Dir} <br /> Celular: {item.Cel} <br /> Universidad: {item.Uni} </span>
                                    <button className="btn btn-danger btn-sm float-end mx-2" >Eliminar</button>
                                    <button className="btn btn-warning btn-sm float-end mx-2">Editar</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='col-4'>
                    <form onSubmit={guardarUsuario}>
                        <input
                            className='form-control mb-2'
                            type='text'
                            placeholder='Ingrese Identificación'
                            onChange={(e) => setIde(e.target.value)}
                        ></input>
                        <input
                            className='form-control mb-2'
                            type='text'
                            placeholder='Ingrese Nombre'
                            onChange={(e) => setNombre(e.target.value)}
                        ></input>
                        <input
                            className='form-control mb-2'
                            type='text'
                            placeholder='Ingrese dirección'
                            onChange={(e) => setDir(e.target.value)}
                        ></input>
                        <input
                            className='form-control mb-2'
                            type='text'
                            placeholder='Ingrese numero celular'
                            onChange={(e) => setCel(e.target.value)}
                        ></input>
                        <input
                            className='form-control mb-2'
                            type='text'
                            placeholder='Ingrese Nombre de la universidad'
                            onChange={(e) => setUni(e.target.value)}
                        ></input>
                        <button
                            className='btn btn-primary btn-block'
                            type='submit'
                        >Agregar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Formulario