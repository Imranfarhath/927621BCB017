// App.js
import { useEffect, useState } from 'react';
import { getAccessToken, getData } from './Connectapi';
import 'bootstrap/dist/css/bootstrap.css';
import image1 from './iconmonstr-product-3.png'


const App = () => {
  const [filter,setfilter]=useState(false);
  const [minprice,setminprice]=useState(0);
  const [maxprice,setmaxprice]=useState(10000);
  const [product,setproduct]=useState('');
  const [company,setcompany]=useState('');
  const [data, setData] = useState({});
  const companies = ["AMZ", "FLP", "SNP", "MYN","AZO"];
  const categories = ["Phone", "Computer", "TV", "Earphone", "Headset", "Remote", "Pendrive","Tablet","Charger","Mouse","Keypad","Bluetooth","Speaker","Laptop","PC"];

function handlesubmit(e)
{
  e.preventDefault();
  const fetchData = async () => {
  try {
    const token = await getAccessToken();
    const allData = {};
    const productval=[e.target.product.value];
    const companyvalue=[e.target.company.value];
    const minvalue=e.target.minvalue.value;
    const maxvalue=e.target.maxvalue.value;
    for (let company of companies) {
      allData[company] = {};
      for (let category of categories) {
        const result = await getData2(productval, companyvalue, token,minvalue,maxvalue);
        const json=result;
        allData[company][category] = json;
        console.log(allData[company][category]);
      }
    }
    setfilter(true);
    setData(allData);
  } catch (error) {
    console.error('Error fetching data', error);
  }
};

fetchData();
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAccessToken();
        const allData = {};

        for (let company of companies) {
          allData[company] = {};
          for (let category of categories) {
            const result = await getData(company, category, token);
            const json=result;
            allData[company][category] = json;
            console.log(allData[company][category]);
          }
        }
        console.log(allData);
        setData(allData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <nav className="navbar navbar-dark bg-primary">
      <h1 className='navbar-brand'>Affordmed</h1>
    </nav>

    <div className='container text-center col-4 mt-4 border border-dark rounded'>
  <h1>Filter your products</h1>
  <form onSubmit={handlesubmit}>
    <div className='form-group'>
      <label htmlFor="company">Choose a company:</label>
      <select className='form-control' name="company" value={company} onChange={(e)=>setcompany(e.target.value)}>
        <option value="AMZ">AMZ</option>
        <option value="FLP">FLP</option>
        <option value="SNP">SNP</option>
        <option value="MYN">MYN</option>
      </select>
    </div>
    <div className='form-group'>
      <label htmlFor="product">Choose a product:</label>
      <select className='form-control' name="product" value={product} onChange={(e)=>setproduct(e.target.value)}>
        <option value="Phone">phone</option>
        <option value="Computer">computer</option>
        <option value="TV">tv</option>
        <option value="Earphone">Earphone</option>
        <option value="Tablet">Tablet</option>
        <option value="Charger">Charger</option>
        <option value="Mouse">Mouse</option>
        <option value="Keypad">Keypad</option>
        <option value="Bluetooth">Bluetooth</option>
        <option value="Pendrive">Pendrive</option>
        <option value="Remote">Remote</option>
        <option value="Speaker">Speaker</option>
        <option value="Headset">Headset</option>
        <option value="Laptop">Laptop</option>
        <option value="PC">PC</option>
      </select>
    </div>
    <div className='form-group'>
      <label htmlFor='minprice'>Minimum Price</label>
      <input className='form-control' type='number' value={minprice} onChange={(e)=>setminprice(e.target.value)}/>
    </div>
    <div className='form-group'>
      <label htmlFor='maxprice'>Maximum Price</label>
      <input className='form-control' type='number' value={maxprice} onChange={(e)=>setmaxprice(e.target.value)}/>
    </div>
    <button className='btn btn-primary m-3' type='submit'>Filter product</button>
  </form>
</div>


    <div className='container my-5'>
      {!filter && <h1 className='mb-4' >All Products</h1>}
      {companies.map(company => (
        <div key={company} className='pb-5'>
          <h2 className='mb-3'>Products offered by the {company}</h2>
          {categories.map(category => (
            <div key={category} className='mb-4'>
              <h3 className='mb-3'>{category}</h3>
              <div className='row'>
                {data[company] && data[company][category] ? (
                  data[company][category].map((item, index) => (
<div key={index} className='col-md-4 mb-3'>
                      <div className='card'>
                        <img
                          src={image1}
                          className='card-img-top'
                          alt={item.productName}
                          width={"2%"} height={"5%"}
                        />
                        <div className='card-body'>
                          <h5 className='card-title'>{item.productName}</h5>
                          <p className='card-text'>
                            <strong>Price:</strong> ${item.price}
                          </p>
                          <p className='card-text'>
                            <strong>Rating:</strong> {item.rating}
                          </p>
                          <p className='card-text'>
                            <strong>Discount:</strong> {item.discount}%
                          </p>
                          <p className='card-text'>
                            <strong>Availability:</strong> {item.availability}
                          </p>
                        </div>
                      </div>
                    </div>
                ))) : (
                  <div>No data available</div>
                )}
              </div>
              <br></br>
            </div>
          ))}
        </div>
        
      ))}
    </div>
    </>
  );
};

export default App;
