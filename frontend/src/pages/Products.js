    import { toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    import API from '../services/api';
    import { useState, useEffect } from 'react';

    function Products() {

      const user =
       JSON.parse(
       localStorage.getItem("user")
  );

    const [products, setProducts] = useState([]);

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    const [search, setSearch] = useState('');

    const [editId, setEditId] = useState(null);

    const fetchProducts = async () => {

        try {

        const response = await API.get('/products');

        setProducts(response.data);

        } catch (error) {

        console.log(error);

        }

    };

    useEffect(() => {

        fetchProducts();

    }, []);

    const addOrUpdateProduct = async () => {

        try {

        if (editId) {

            await API.put(`/products/${editId}`, {
            name,
            quantity,
            price,
            image
            });
            toast.success('Product Updated'
                
            );

            setEditId(null);

        } else {

            await API.post('/products', {
            name,
            quantity,
            price,
            image
            });

            toast.success('Product Added Successfully'

            );
        }

        fetchProducts();

        setName('');
        setQuantity('');
        setPrice('');
        setImage('');

        } catch (error) {

        console.log(error);

        toast.error('Operation Failed');

        }

    };

    const deleteProduct = async (id) => {

  const confirmDelete =
    window.confirm(

      'Are you sure you want to delete this product?'

    );

  if (!confirmDelete) {

    return;

  }

  try {

    await API.delete(`/products/${id}`);

    fetchProducts();

    toast.success(
      'Product Deleted Successfully'
    );

  } catch (error) {

    console.log(error);

    toast.error('Delete Failed');

  }

};

    const editProduct = (product) => {

        setEditId(product.id);

        setName(product.name);
        setQuantity(product.quantity);
        setPrice(product.price);
        setImage(product.image);

    };

    return (

        <div className="container mt-4">

        <h1 className="fw-bold mb-4">
            Products
        </h1>

        {/* SEARCH BAR */}

        <input
            type="text"
            className="form-control mb-4 shadow-sm"
            placeholder="Search Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
            borderRadius: '12px',
            padding: '12px'
            }}
        />

        {/* PRODUCT FORM */}

        <div
            className="card border-0 shadow-lg p-4 mt-4"
            style={{
            borderRadius: '25px',
            background:
                'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)'
            }}
        >

            <div className="d-flex justify-content-between align-items-center mb-4">

            <h2 className="fw-bold m-0">

                {editId
                ? 'Edit Product'
                : 'Add Product'}

            </h2>

            <span
                className="badge bg-dark px-3 py-2"
                style={{
                borderRadius: '12px'
                }}
            >
                Inventory Form
            </span>

            </div>

            <div className="row">

            <div className="col-md-8">

                <input
                type="text"
                placeholder="Product Name"
                className="form-control mb-3 p-3"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
                style={{
                    borderRadius: '15px'
                }}
                />

                <input
                type="number"
                placeholder="Quantity"
                className="form-control mb-3 p-3"
                value={quantity}
                onChange={(e) =>
                    setQuantity(e.target.value)
                }
                style={{
                    borderRadius: '15px'
                }}
                />

                <input
                type="number"
                placeholder="Price"
                className="form-control mb-3 p-3"
                value={price}
                onChange={(e) =>
                    setPrice(e.target.value)
                }
                style={{
                    borderRadius: '15px'
                }}
                />

                <input
                type="text"
                placeholder="Image URL"
                className="form-control mb-3 p-3"
                value={image}
                onChange={(e) =>
                    setImage(e.target.value)
                }
                style={{
                    borderRadius: '15px'
                }}
                />

                <button
  onClick={addOrUpdateProduct}
  className="btn w-100 py-3 fw-bold"
  style={{
  borderRadius: '15px',
  background:
    'linear-gradient(90deg,#111,#333)',
  color: 'white',
  border: 'none',
  transition: '0.3s',
  cursor: 'pointer'
}}

  onMouseOver={(e) =>
    e.target.style.transform =
      'scale(1.02)'
  }

  onMouseOut={(e) =>
    e.target.style.transform =
      'scale(1)'
  }
>

                {editId
                    ? 'Update Product'
                    : 'Add Product'}

                </button>

            </div>

            <div className="col-md-4 d-flex justify-content-center align-items-center">

                <div
                className="shadow"
                style={{
                    width: '220px',
                    height: '220px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    background: '#f5f5f5'
                }}
                >

                <img
                    src={
                    image ||
                    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853'
                    }
                    alt="preview"
                    style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                    }}
                />

                </div>

            </div>

            </div>

        </div>

        {/* PRODUCT TABLE */}

        <div
            className="card shadow border-0 p-3 mt-4"
            style={{
            borderRadius: '20px'
            }}
        >

            <table className="table align-middle">

            <thead>

                <tr>

                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Action</th>

                </tr>

            </thead>

            <tbody>

  {products.filter((product) =>

    product.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )

  ).length === 0 ? (

    <tr>

      <td
        colSpan="6"
        className="text-center py-5"
      >

        <h4 className="text-muted">

          📦 No products found

        </h4>

      </td>

    </tr>

  ) : (

    products
      .filter((product) =>

        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

      )
      .map((product) => (

        <tr key={product.id}>

          <td>{product.id}</td>

          <td>

            <img
              src={product.image}
              alt="product"
              width="80"
              height="80"
              style={{
                objectFit: 'cover',
                borderRadius: '12px'
              }}
            />

          </td>

          <td className="fw-bold">
            {product.name}
          </td>

          <td>

            <span
              className={`badge ${
                product.quantity > 20
                  ? 'bg-success'
                  : product.quantity > 5
                  ? 'bg-warning text-dark'
                  : 'bg-danger'
              }`}
            >

              {product.quantity > 20
                ? `Available: ${product.quantity}`
                : product.quantity > 5
                ? `Limited: ${product.quantity}`
                : `Low Stock: ${product.quantity}`}

            </span>

          </td>

          <td className="fw-bold text-primary">
            RM{product.price}
          </td>

          <td>

            <button
              className="btn btn-warning btn-sm me-2"
              onClick={() =>
                editProduct(product)
              }
              style={{
                borderRadius: '10px'
              }}
            >
              Edit
            </button>

            {user?.role === "admin" && (

             <button
                className="btn btn-danger btn-sm"
                onClick={() =>
                deleteProduct(product.id)
    }
                 style={{
                 borderRadius: '10px'
    }}
  >
    Delete
  </button>

)} 

          </td>

        </tr>

      ))

  )}

</tbody>

            </table>

        </div>

        </div>

    );

    }

    export default Products;