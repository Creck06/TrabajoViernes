import React from 'react'
import { nanoid } from "nanoid";
import swal from "sweetalert"
import { firebase } from './firebase'
const Formulario = () => {
    const [identificacion, setIde] = React.useState("");
    const [nombre, setNombre] = React.useState("");
    const [direccion, setDir] = React.useState("");
    const [celular, setCel] = React.useState("");
    const [universidad, setUni] = React.useState("");
    const [ListaEstu, setLista] = React.useState([]);
    const [id, setId] = React.useState("")
    const [modoEdicion, setEdicion] = React.useState(false)
    const [error, setError] = React.useState(null)
    var imagenes = 'https://picsum.photos/500/300';

    React.useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const db = firebase.firestore()
                const data = await db.collection('Usuarios').get()
                const arrayData = data.docs.map(doc => (
                    { id: doc.id, ...doc.data() }
                ))
                //console.log(arrayData)
                ListaEstu(arrayData)
            } catch (error) {

            }
        }
        obtenerDatos();
    })

    const guardarUsuario = async (e) => {
        e.preventDefault()
        if (!identificacion.trim()) {
            setError('Digite identificación')
            return
        }
        if (!nombre.trim()) {
            setError('Digite nombre')
            return
        }
        if (!direccion.trim()) {
            setError('Digite dirección')
            return
        }
        if (!celular.trim()) {
            setError('Digite celular')
            return
        }
        if (!universidad.trim()) {
            setError('Digite Universidad')
            return
        }

        try {
            swal({
                position: 'top-end',
                icon: 'success',
                title: 'Agregado',
                showConfirmButton: false,
                timer: 700
            })
            const db = firebase.firestore()
            const nuevoUsuario = {
                ID: identificacion, Nombre: nombre, Dir: direccion, Cel: celular, Uni: universidad, Imagen: imagenes
            }
            await db.collection('Usuarios').add(nuevoUsuario)

            setLista([
                ...ListaEstu,
                { id: nanoid(), ID: identificacion, Nombre: nombre, Dir: direccion, Cel: celular, Uni: universidad, Imagen: imagenes }
            ])

            e.target.reset()
            setIde('')
            setNombre('')
            setDir('')
            setCel('')
            setUni('')
            setError(null)
            imagenes = ('')
            imagenes = 'https://picsum.photos/500/300'

        } catch (error) {
            console.log(error)
        }


    }
    const editar = item => {
        setId(item.id)
        setIde(item.ID)
        setNombre(item.Nombre)
        setDir(item.Dir)
        setCel(item.Cel)
        setUni(item.Uni)
        imagenes = item.Imagen
        setEdicion(true)
        setError(null)
    }
    const edicion = async e => {
        e.preventDefault()
        if (!identificacion.trim()) {
            setError('Digite identificación')
            return
        }
        if (!nombre.trim()) {
            setError('Digite nombre')
            return
        }
        if (!direccion.trim()) {
            setError('Digite dirección')
            return
        }
        if (!celular.trim()) {
            setError('Digite celular')
            return
        }
        if (!universidad.trim()) {
            setError('Digite Universidad')
            return
        }
        try {
            const db = firebase.firestore()
            await db.collection('Usuarios').doc(id).update({
                ID: identificacion, Nombre: nombre, Dir: direccion, Cel: celular, Uni: universidad, Imagen: imagenes
            })
            const arrayEditado = ListaEstu.map(
                item => item.id === id ? { id: id, ID: identificacion, Nombre: nombre, Dir: direccion, Cel: celular, Uni: universidad, Imagen: imagenes } : item
            )

            setLista(arrayEditado)
            setId('')
            setIde('')
            setNombre('')
            setDir('')
            setCel('')
            setUni('')
            setError(null)
            imagenes = ('')
            imagenes = 'https://picsum.photos/500/300'
            setEdicion(false)
        } catch (error) {
            console.log(error)
        }
    }


    const eliminar = id => {
        swal({
            title: '¿Estás seguro?',
            text: "No podrás deshacer esta acción.",
            icon: 'warning',
            buttons: ["No", "Sí"]
        }).then(async (result) => {
            if (result) {
                try {
                    const db = firebase.firestore()
                    await db.collection('Usuarios').doc(id).delete()
                    const aux = ListaEstu.filter(item => item.id !== id)
                    setLista(aux)
                } catch (error) {
                    console.log(error)
                }
                swal({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Eliminado',
                    showConfirmButton: false,
                    timer: 700
                })
            }
        })


    }
    const cancelar = () => {
        setEdicion(false)
        setId('')
        setIde('')
        setNombre('')
        setDir('')
        setCel('')
        setUni('')
        setError(null)
        imagenes = ('')
        imagenes = 'https://picsum.photos/500/300'
    }
    return (
        <div className='container mt-5'>
            <h1 className='text-center'>Formulario</h1>
            <br />

            <form onSubmit={modoEdicion ? edicion : guardarUsuario}>
                {
                    error ? <span className="text-danger">{error}</span> : null
                }
                <input
                    className='form-control mb-2'
                    type='text'
                    placeholder='Ingrese Identificación'
                    onChange={(e) => setIde(e.target.value)}
                    value={identificacion}
                ></input>
                <input
                    className='form-control mb-2'
                    type='text'
                    placeholder='Ingrese Nombre'
                    onChange={(e) => setNombre(e.target.value)}
                    value={nombre}
                ></input>
                <input
                    className='form-control mb-2'
                    type='text'
                    placeholder='Ingrese dirección'
                    onChange={(e) => setDir(e.target.value)}
                    value={direccion}
                ></input>
                <input
                    className='form-control mb-2'
                    type='text'
                    placeholder='Ingrese numero celular'
                    onChange={(e) => setCel(e.target.value)}
                    value={celular}
                ></input>
                <input
                    className='form-control mb-2'
                    type='text'
                    placeholder='Ingrese Nombre de la universidad'
                    onChange={(e) => setUni(e.target.value)}
                    value={universidad}
                ></input>
                {
                    modoEdicion ?
                        (
                            <>
                                <button className="btn btn-warning btn-block" type="submit">Editar</button>
                                <button className="btn btn-dark btn-block" onClick={() => cancelar}>Cancelar</button>
                            </>
                        ) :
                        <button
                            className='btn btn-primary btn-block'
                            type='submit'
                        >Guardar</button>
                }
            </form>
            <div className='row'>
                <div className='col-8'>
                    <ul className='list-group'>
                        {
                            ListaEstu.map(item => (
                                <li className="list-group-item" key={item.id}>
                                    <img src={imagenes} alt="nombre" /><br />
                                    <span className="lead">Identificación: {item.ID} <br /> Nombre: {item.Nombre} <br /> Dirección: {item.Dir} <br /> Celular: {item.Cel} <br /> Universidad: {item.Uni} </span>
                                    <button className="btn btn-danger btn-sm float-end mx-2" onClick={() => eliminar(item.id)}>Eliminar</button>
                                    <button className="btn btn-warning btn-sm float-end mx-2" onClick={() => editar(item)}>Editar</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='col-4'>
                </div>
            </div>
        </div>
    )
}

export default Formulario