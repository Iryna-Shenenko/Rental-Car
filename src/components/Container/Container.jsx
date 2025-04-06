import { useNavigate } from "react-router-dom"


export const Container = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/catalog');
    }

    return (
        <section> 
        <div>
            <h1>Find your perfect rental car</h1>
            <p>Reliable and budget-friendly rentals for any journey</p>
            <div>
                <button  onClick={handleClick}>View Catalog</button> 
            </div>
        </div>
        </section>
    )
}