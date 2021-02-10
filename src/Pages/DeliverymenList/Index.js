import React, { useCallback, useEffect, useState} from 'react';
import GlobalMenu from '../../components/GlobalMenu'
import api from '../../services/api'


const deliverymenList = () => {
    const [deliverymen, setDeliverymen] = useState([]);

    const loadingDeliverymen = useCallback(async () => {
        try {
            const response = await api.get('/users');

            if (response.data){
                setDeliverymen(response.data);
            }else {
                alert("Não foi encontrado Nenhum Entregador")
            }
        } catch (error) {
            alert(`Ocorreu uma falha ao  retornar a lista de Entregadores. ${error}`)
        }
    }, []);

    useEffect(() =>{
        loadingDeliverymen()
    }, [loadingDeliverymen]);

    return(
        <>
            <GlobalMenu />
            <h1>Lista De Entregadores</h1>
            <ul>
                {deliverymen.map((d) => {
                    return(
                        <li key={d.id}>
                            <img src={d.avatar_url}/>
                            <span>{d.login}</span>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}