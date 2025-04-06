import { RiseLoader } from 'react-spinners';


export const Loader = ({color = "#007dff",  loading = true  }) => {
    return (
        <div >
            <RiseLoader color={color} loading={loading}/>
        </div>
    );
};

