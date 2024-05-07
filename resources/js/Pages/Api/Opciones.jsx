import Layout from "@/Layouts/Layout.jsx";
import {useState} from "react";
import Tabla from "@/Components/Tabla.jsx";

export default function Opciones({langs}) {
    const [visible, setVisible] = useState(true);
    const [langSelected, setLangSelected] = useState(langs[0])
    const [rows, setRows] = useState([]);
    const [fields, setFields] = useState([]);
    const [name, setName] = useState("");


    const handleLangSelected = (e) => {
        setLangSelected(e.target.value);
    }
    const handleClose =()=>{
        setVisible(true);
        setFields([])
        setRows([])
        setName("")
    }


    //función para obtener los repos de un determinado lengaje
    const getReposLang = () => {
        const url = `https://api.github.com/search/users?q=language:${langSelected}`
        axios.get(url)
            .then((response) => {
                setFields(["avatar", "url", "login"]);
                setRows(response.data.items.map((data) => ({
                            avatar: data.avatar_url,
                            url: data.html_url,
                            login: data.login
                        }
                    )
                ))
                setName(`Listado de Users de ${langSelected}`)
                setVisible(false)
            })
            .catch = ((error) => {
            console.error("Error getReposLang");
            console.error(error);
        })
    }
    const getGit = (opcion) => {
        if (opcion == "repos") {
            var url = `https://api.github.com/search/users?q=language:${langSelected}`;
        }
        else {
            var url = "https://api.github.com/search/users?q=location:Zaragoza";
        }

        axios.get(url)
            .then((response) => {
                setFields(["avatar", "url", "login"]);
                setRows(response.data.items.map((data) => ({
                            avatar: data.avatar_url,
                            url: data.html_url,
                            login: data.login
                        }
                    )
                ))
                setName(`Listado de Users de ${langSelected}`)
                setVisible(false)
            })
            .catch = ((error) => {
            console.error("Error getReposLang");
            console.error(error);
        })
    }
    const getUserGit = () => {
        const url ="https://api.github.com/search/users?q=location:Zaragoza";
        axios.get(url)
            .then((response) => {
                setFields(["avatar", "url", "login"]);
                setRows(response.data.items.map((data) => ({
                            avatar: data.avatar_url,
                            url: data.html_url,
                            login: data.login
                        }
                    )
                ))
                setName("Listado de Users de Zaragoza")
                setVisible(false)
            })
            .catch = ((error) => {
            console.error("Error getReposLang");
            console.error(error);
        })
    }


    const getImages = () => {
        const secret = "EMi4yUpe5MzEVryUwiwUA4JHiX46lByLXuMvQD1ONA8";
        const url_base = `https://api.unsplash.com/photos/random?client_id=${secret}&count=10`;
        axios.get(url_base)
            .then  ((response) => {
                setVisible(false)
                setFields(["avatar", "url", "description" ]);
                setRows(response.data.map((data) =>({
                        avatar: data.urls.regular,
                        url:  data.links.download,
                        description: data.description,
                    }
                )));
                setCrud(false)
                setName(`10 Imágenes aleatorias`)
                console.log(images);
            })
            .catch = ((error) => {
            console.error("Error en getImages")
            console.error(error)
        })
    }
    const getFilms = () => {

        const url_base = `http://127.0.0.1:8000/getFilms`;
        axios.get(url_base)
            .then((response)=>{
        setVisible(false)
        setFields(["title", "url"]);
        setRows(response.data.results.map((data) =>({
                title: data.title,
                url:`https://www.themoviedb.org/movie/${data.id}`
            })))
                }
        )
            .catch = ((error) => {
            console.error("Error en getFilms")
            console.error(error)
        })
    }





return (

        <Layout>
            {visible && (
                <div className="flex justify-center items-center h-full">
                    <div className="grid grid-cols-2 gap-4 ">
                        <div className="card w-96 bg-base-100 shadow-xl image-full">
                            <figure><img src="/images/GIT_Repository.jpg" alt="Shoes"/></figure>
                            <div className="card-body">
                                <h2 className="card-title">Repositorios de un lenguaje!</h2>
                                <p>User de git</p>

                                <select onChange={handleLangSelected} value={langSelected} className="text-green-800">
                                    {langs.map((lang, index) => (
                                        <option key={index} value={lang}>{lang}</option>
                                    ))}

                                </select>
                                <div className="card-actions justify-end">
                                    <button onClick={getReposLang} className="btn btn-primary">Mostrar repositorios
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card w-96 bg-base-100 shadow-xl image-full">
                            <figure><img src="/images/GIT_Users.jpeg"
                                         alt="Shoes"/></figure>
                            <div className="card-body">
                                <h2 className="card-title">Usuarior de git!</h2>
                                <p>Usuarios de Zaragoza</p>
                                <div className="card-actions justify-end">
                                    <button onClick={getUserGit} className="btn btn-primary">Ver usuarios</button>
                                </div>
                            </div>
                        </div>
                        <div className="card w-96 bg-base-100 shadow-xl image-full">
                            <figure><img src="/images/IMAGES_Unsplash.jpeg"
                                         alt="Shoes"/></figure>
                            <div className="card-body">
                                <h2 className="card-title">Ver imágemes</h2>
                                <p>Obtener 10 imágenes aleatorioas</p>
                                <div className="card-actions justify-end">
                                    <button onClick={getImages} className="btn btn-primary">Get Images</button>
                                </div>
                            </div>
                        </div>
                        <div className="card w-96 bg-base-100 shadow-xl image-full">
                            <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                         alt="Shoes"/></figure>
                            <div className="card-body">
                                <h2 className="card-title">Pelis</h2>
                                <p>Ufff qué bien</p>
                                <div className="card-actions justify-end">
                                    <button onClick={getFilms} className="btn btn-primary">Ver films</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!visible && (
                <div onClick={handleClose} className="flex flex-col justify-center items-center h-full">
                    <button className="btn btn-primary">Cerrar</button>
                    <Tabla nombre={name} campos={fields} filas={rows} crud={false}/>
                </div>
            )}
        </Layout>

    );
}