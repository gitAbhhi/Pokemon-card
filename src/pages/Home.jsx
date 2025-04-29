import axios from 'axios'
import React, { useEffect, useContext, useState } from 'react'
import Layout from './Layout'

const Home = () => {

    // const { products, setproducts } = useContext(StoreContext)
    const [pokemonList,setpokemonList]=useState([])
    const [selectedType, setSelectedType] = useState("");
    const [filterpokemon,setfilterpokemon]=useState("")

    const filterpokemonlist=pokemonList.filter(pokemon=> pokemon.name.includes(filterpokemon))

const selectedtypepokemon=pokemonList.filter(pokemon=>pokemon.types.some(t=>t.type.name===selectedType))

    async function fetchpokemondata(pokemon){
        try {
            const response=await fetch(pokemon.url)
            const pokemondata=await response.json()

            setpokemonList(prevlist=>[...prevlist,pokemondata])
        } catch (error) {
            console.log("error in fetching pokemon", error)
        }
    }


    //fetch pokemon using fake api
    async function fetchPokemons() {
        try {
            const res=await fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
            const data=await res.json()

            data.results.forEach(pokemon => {
                fetchpokemondata(pokemon)
            });
        } catch (error) {
            console.log("error in fetching pokemon", error)
        }
        
    }

    const printselected = (e) => {
            const selectedvalue = e.target.value;
            filterpokemonlist=pokemonList.filter(pokemon=> pokemon.types.includes(selectedvalue))
    }

    useEffect(() => {
        fetchPokemons()
    }, [])

    return (

        <Layout>
            <div className='w-full min-h-screen bg-gray-800' >
                <div className='flex justify-center'>

                <input className='bg-white w-[70%] md:w-[50%] rounded-xl m-2 p-2 pl-[20px] h-[40px]' type="text" placeholder='Search  pokemon' value={filterpokemon} onChange={(e)=>setfilterpokemon(e.target.value)}  />
                <label htmlFor="typeFilter"></label>
                <select className='bg-white rounded-xl m-2 p-2 h-[40px]' value={selectedType} onChange={e=>setSelectedType(e.target.value)} id="typeFilter">
                    <option value="">-- Select Type --</option>
                    <option value="fire">Fire</option>
                    <option value="water">Water</option>
                    <option value="grass">Grass</option>
                    <option value="bug">Bug</option>
                    <option value="flying">Flying</option>
                    <option value="poison">Poison</option>
                </select>
                </div>

                <div className='grid  p-4 gap-3 grid-cols-1 sm:grid-cols-2  md:grid-cols-4 justify-center mx-auto'>
                    {selectedtypepokemon.length > 0 ? (selectedtypepokemon.map((pokemon,index) => (
                        // <Link  to={`pokemon/${pokemon.id}`}>
                            <div className="flex justify-center">
                                <div className="h-[330px] shadow-md hover:shadow-amber-50 w-[340px] rounded-xl m-[30px] bg-white p-3" >
                                <h4 className="font-bold h-[50px] text-center text-2xl">{pokemon.name}</h4>
                                    <img
                                        className="h-[150px] object-contain w-full rounded-lg"
                                        src={pokemon.sprites.front_default}
                                        alt={pokemon.name}
                                    />
                                    <div className="p-[5px] text-center ">
                                        <div>
                                            <span className='font-bold text-xl'>
                                                Type: 
                                            </span>
                                            {pokemon.types.map((typeobj,index)=>(
                                                
                                                <span key={index} className='m-2'>{typeobj.type.name}

                                            </span>
                                            ))}
                                        </div>
                                        {/* <p className="text-2xl font-bold   text-gray-600">Type: {pokemon.types[0].type.name}</p> */}
                                            <h4 className="font-bold h-[90px] m-2">{pokemon.id}</h4>
                                    </div>
                                </div>
                            </div>
                        // </Link>
                    ))) : (
                        <p className="text-white text-center col-span-3"></p>
                    )}
                </div>
                <div className='grid   p-4 gap-3 grid-cols-1 sm:grid-cols-2  md:grid-cols-4 justify-center mx-auto'>
                    {pokemonList.length > 0 ? (pokemonList.map((pokemon) => (
                        // <Link  to={`pokemon/${pokemon.id}`}>
                            <div key={pokemon.id} className="flex justify-center">
                                <div className="h-[300px] shadow-md hover:w-[335px] hover:h-[295px] w-[340px] lg:mb-[30px] rounded-xl bg-white p-3" >
                                <h4 className="font-bold h-[50px] text-center text-2xl">{pokemon.name}</h4>
                                    <img
                                        className="h-[150px] object-contain w-full rounded-lg"
                                        src={pokemon.sprites.front_default}
                                        alt={pokemon.name}
                                    />
                                    <div className="p-[5px] text-center ">
                                        <div>
                                            <span className='font-bold text-xl'>
                                                Type: 
                                            </span>
                                            {pokemon.types.map((typeobj,index)=>(
                                                
                                                <span key={index} className='m-2'>{typeobj.type.name}

                                            </span>
                                            ))}
                                        </div>
                                        {/* <p className="text-2xl font-bold   text-gray-600">Type: {pokemon.types[0].type.name}</p> */}
                                            <h4 className="font-bold h-[30px] m-2">{pokemon.id}</h4>
                                    </div>
                                </div>
                            </div>
                        // </Link>
                    ))) : (
                        <p className="text-white text-center col-span-3">Loading...</p>
                    )}
                </div>

            </div>
        </Layout>
    )

}

export default Home
