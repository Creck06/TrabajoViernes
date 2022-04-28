import React from 'react'

const Formulario = () => {
    const [identificacion, setIde] = React.useState("");
    const [nombre, setNombre] = React.useState("");
    const [direccion, setDir] = React.useState("");
    const [celular, setCel] = React.useState("");
    const [universidad, setUni] = React.useState("");
    const [ListaEstu, setLista] = React.useState([]);

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
        if (!identificacion.trim()) {
            alert('Digite identificación')
        }
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
    }


    return (
        <div className='container mt-5'>
            <h2>Formulario</h2>
            <br/>
            <form onSubmit={guardarUsuario}>
                <input
                    className='form-control mb-2'
                    type='text'
                    placeholder='Ingrese Identificación'
                    onChange={(e)=>setIde(e.target.value)}
                ></input>
                <input
                    className='form-control mb-2'
                    type='text'
                    placeholder='Ingrese Nombre'
                    onChange={(e)=>setNombre(e.target.value)}
                ></input>
                <input
                    className='form-control mb-2'
                    type='text'
                    placeholder='Ingrese dirección'
                    onChange={(e)=>setDir(e.target.value)}
                ></input>
                <input
                    className='form-control mb-2'
                    type='text'
                    placeholder='Ingrese numero celular'
                    onChange={(e)=>setCel(e.target.value)}
                ></input>
                <input
                    className='form-control mb-2'
                    type='text'
                    placeholder='Ingrese Nombre de la universidad'
                    onChange={(e)=>setUni(e.target.value)}
                ></input>
                <button
                className='btn btn-primary btn-block'
                type='submit'
                >Agregar</button>
            </form>
            <br/>
            {
                ListaEstu.map(item=>(
                    <li className="list-group-item" key={item.ID}>
                        <span className="lead">{item.ID} - {item.Nombre} - {item.Dir} - {item.Cel} - {item.Uni} </span>
                    </li>
                ))
            }
        </div>
    )
}

export default Formulario