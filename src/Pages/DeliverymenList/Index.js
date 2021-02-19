import React, { useCallback, useEffect, useState} from 'react';
import GlobalMenu from '../../components/GlobalMenu';
import api from '../../services/api';


const DeliverymenList = () => {
    const [deliverymen, setDeliverymen] = useState([]);
    const [perPage, setPerpage] = useState(5);

    const loadingDeliverymen = useCallback(async () => {
        try {
            const response = await api.get(`/users?per_page=${perPage}`);

            if (response.data){
                setDeliverymen(response.data);
            }else {
                alert("Não foi encontrado Nenhum Entregador")
            }
        } catch (error) {
            alert(`Ocorreu uma falha ao  retornar a lista de Entregadores. ${error}`)
        }
    }, [perPage]);

    useEffect(() =>{
        loadingDeliverymen()
    }, [loadingDeliverymen]);

    return(
        <>
            <GlobalMenu />
            <h1>Lista De Entregadores</h1>
            <div>
                <label htmlFor="per_page">Quantidade de Páginas</label>
                <input 
                        type="number"
                        id="per_page"
                        name="per_page"
                        min="1"
                        max="100"
                        value={perPage}
                        onChange={(e) => setPerpage(e.target.value)}                        
                        />
            </div>
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

export default DeliverymenList;