import React, { useState } from 'react';
import Board from '@lourenci/react-kanban';
import GlobalMenu from '../../components/GlobalMenu';
import api from '../../services/api'

const DeliverymenPicture = () =>{
    const [picture, setPicture] = useState();

    const loadingPicture = useCallback(async () => {
        try {
            const response = await api.get(`/users`);

            if (response.data){
                setPicture(response.data);
            }else {
                alert("Não Foi Possivel Carregar A Imagem")
            }
        } catch (error) {
            alert(`Ocorreu uma falha ao Carregar A Imagem . ${error}`)
        }
    }, []);
    
    useEffect(() =>{
        loadingPicture()
    }, [loadingPicture]);
}

const board = {
    columns: [
        {
            id: 1,
            title: '# Pedido #',
            cards: [
                {
                    id: 1, 
                    title: 'Pedido #1',
                    description: 'Vila Prado [ 19:00 ]',
                },
                {
                    id: 2, 
                    title: 'Pedido #2',
                    description: 'Vila São Jose [ 20:15 ]',
                },
                {
                    id: 3, 
                    title: 'Pedido #3',
                    description: 'Pacaembu [ 20:40 ]',
                },
                {
                    id: 4, 
                    title: 'Pedido #4',
                    description: 'Aracy [ 21:00 ]',
                },
                {
                    id: 5, 
                    title: 'Pedido #5',
                    description: 'Boa vista [ 21:10 ]',
                },
                {
                    id: 6, 
                    title: 'Pedido #6',
                    description: 'Antenor Garcia [ 21:33 ]',
                },
                {
                    id: 7, 
                    title: 'Pedido #7',
                    description: 'São Rafael [ 20:22 ]',
                },
                {
                    id: 8, 
                    title: 'Pedido #8',
                    description: 'Douradinho [ 22:52 ]',
                },
            ],
        },
        {
            id: 2,
            title: {picture.map((p) => {
            })},
            cards: [],
        },
        {
            id: 3,
            title: 'joão',
            cards: [],
        },
        {
            id: 4,
            title: 'zé',
            cards: [],
        }
    ],
}

const AssingOrder = () => {
    const [newBoard, setNewBoard] = useState(null);
    const [printBoard, setPrintBoard] = useState(false);
    return(
        <>
        <GlobalMenu />
        <h1>Encaminhamento de Pedidos</h1>
        <Board
            initialBoard={board}
            onCardDragEnd={(board) => {
                setPrintBoard(false);
                setNewBoard(board);
            }}
        />
        <button
            type="button"
            onClick={newBoard ? 
                () =>  setPrintBoard(true)
                : () => alert("Realize a Configuração desejada antes de confirmar")
            }
        >
            Confirmar
        </button>
        {printBoard && newBoard? (
            newBoard.columns.map((col) => {
                if (col.id > 1){
                    return(
                        <div key={col.id}>
                            <h2>{col.title}</h2>
                            <ul>
                                {col.cards.map((c)=> {
                                    return(
                                        <li key= {c.id}>
                                            <h3>{c.title}</h3>
                                            <p>{c.description}</p>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                }else{
                    return null;
                }
            })
        ) : null}
        </>
    );
}

export default {AssingOrder, DeliverymenPicture}; 