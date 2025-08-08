import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DashBoard.css";
import { addProduct as addProductService } from "../../services/medicineService";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { updateMedicineById } from '../../services/medicineService';
import { addCategories, deleteCategory, fetchCategories } from "../../services/categoryService";
import { fetchSubCategories, addSubCategory, deleteSubCategory } from "../../services/subcategoryService";
import { fetchMedicines, deleteMedicineById } from "../../services/medicineService";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthAsync } from "../Account/authHandle/authSlice";
import { addPharmacyService, fetchOrders } from "../../services/orderService";
import { fetchPharmacy } from "../../services/pharmacyService";

const prescription_required_string = ["true", "false"];

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home"); // Track which section is active
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    price: "",
    quantity: "",
    description: "",
    category: "",
    subcategory: "",
    prescription_required: "",
    image: "",
  });
  const [categories1, setCategories] = useState([]);
  const [newCat, setNewCat] = useState({
    name:"",
  })
  const [subcategory1, setSubCategories] = useState([]);
  const [error, setError] = useState(null);
  const [subCategoryNameAdd, setSubCategoryNameAdd] = useState("");
  const [selectedCategoryforSubcategory, setSelectedCategoryforSubcategory] = useState("");
  const dispatch = useDispatch();
  const [userOrders, setUserOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedPharmacies, setSelectedPharmacies] = useState({});
  const [allPharmacies, setallPharmacies] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await dispatch(checkAuthAsync());
      // Check if the payload has a status 401 indicating unauthorized access
      console.log(result);
      
      if (result?.payload?.status === 401) {
        toast.error("You must be logged in to access this page");
        navigate("/signin");
      }

      if(result?.payload?.user.role==="user"){
        toast.error("Admin Privilege Required")
        navigate("/")
      }
    };
    checkAuth();
  }, [dispatch, navigate]);

  const loadCategories = async () => {
    try {
      const categoryData = await fetchCategories();
      console.log(categoryData.data);
      
      setCategories(categoryData.data); // Set categories state
    } catch (error) {
      setError(error.message); // Handle error if the fetch fails
    }
  };

  useEffect(() => {    
    loadCategories();    
  }, []);

  const loadSubCategories = async () => {
    try {
      const subcategoryData = await fetchSubCategories();
      console.log(subcategoryData.data);
      
      setSubCategories(subcategoryData.data); // Set categories state
    } catch (error) {
      setError(error.message); // Handle error if the fetch fails
    }
  };

  useEffect(() => {    
    loadSubCategories();    
  }, []);

  const fetchUserOrders = async () => {
      try {
        const response = await fetchOrders();
        setUserOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error.message);
      }
    };
  
    useEffect(() => {
      fetchUserOrders();
    }, []);

    const formatDate = (isoDate) => {
      const date = new Date(isoDate);
      return date.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    };

    const handlePharmacyChange = (orderId, pharmacyName) => {
      setSelectedPharmacies((prev) => ({
        ...prev,
        orderId: pharmacyName,
      }));
    };

  // Function to fetch products
  const fetchProducts = async (page, limit) => {
    try {
      const { data, meta } = await fetchMedicines({ page, limit });
      setProducts(data); 
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    }
  };

  // Effect to call fetchProducts when the component mounts or page changes
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddPharmacy = async () => {
    if (!selectedPharmacies || Object.keys(selectedPharmacies).length === 0) {
      toast.error("Please select a pharmacy for at least one order.");
      return;
    }

    try {
      console.log(selectedPharmacies);
      const payload = Object.entries(selectedPharmacies).map(([orderId, pharmacyId]) => ({
        orderId,
        pharmacyId,
      }));
      console.log(payload);
      const response = await addPharmacyService(payload);
      toast.success(response.message || "Added Pharmacy to order added successfully!");
      fetchPharmacyFunc();
      fetchUserOrders();
    } catch (error) {
      toast.error("Failed to add pharmacy. Please try again.");
    }
  };

  const fetchPharmacyFunc = async () => {
    try {
      const { data } = await fetchPharmacy();
      setallPharmacies(data); 
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    }
  };

  // Effect to call fetchProducts when the component mounts or page changes
  useEffect(() => {
    fetchPharmacyFunc();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const imagePreview = watch("images");


  const onSubmit = async (data) => {
    try {
      const responseData = await addProductService(data);
      reset();
      toast.success("Product added successfully!");
      await fetchProducts();
      
      // if (data.images && data.images[0]) {
      //   const file = data.images[0];
      //   const formData = new FormData();
      //   formData.append('images', file);
      //   Object.keys(data).forEach(key => {
      //     if (key !== 'images') {
      //       formData.append(key, data[key]);
      //     }
      //   });
      //   const response = await addProductService(data);
        // const reader = new FileReader();
        // reader.onloadend = async () => {
        //   const productData = { ...data, images: reader.result };
        //   // console.log(productData);
          
        //   const response = await addProductService(productData);
        //   toast.success("Product added successfully!");
        // };
        // reader.readAsDataURL(file);
      // } else {
      //   const response = await addProductService(data);
      //   toast.success("Product added successfully without image!");
      // }
      // reset();
      // await fetchProducts();
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
    }
  };

  const onSubmitCategory = async (data) => {
    try {
        // console.log(newCat);
        const response = await addCategories(newCat);
        setNewCat({
          name:"",
        })
        loadCategories();
        toast.success("Category added successfully!");
      }
    catch (error) {
      toast.error("Failed to add category. Please try again.");
    }
  };

  const handleAddSubCategory = async () => {
    if (!subCategoryNameAdd || !selectedCategoryforSubcategory) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await addSubCategory({
        name: subCategoryNameAdd,
        categoryId: selectedCategoryforSubcategory,
      });
      toast.success(response.message || "Subcategory added successfully!");
      loadSubCategories();
      loadCategories();
    } catch (error) {
      toast.error("Failed to add subcategory. Please try again.");
    }
  };

  const handleEditProduct = (product) => {
    setNewProduct({ ...product });
    setActiveSection("editProduct"); // Switch to the edit product section
  };

  const updateProduct = async () => {
    try {
      const response = await updateMedicineById(newProduct.id, newProduct);
      console.log(response);
      

    const updatedProducts = products.map((product) =>
      product._id === newProduct._id ? { ...product, ...newProduct } : product
    );
    setProducts(updatedProducts);
    toast.success("Product updated successfully")
    setNewProduct({
      name: "",
      price: "",
      quantity: "",
      description: "",
      subcategory: "",
    });
    setActiveSection("manageProducts"); // Switch back to manage products
  } catch (error) {
    console.error("Failed to update product:", error);
  }
  };

  const deleteProduct = async (id) => {
    try {
        const response = await deleteMedicineById(id);
        toast.success(response.message || "Product deleted successfully!");
        await fetchProducts();
    } catch (error) {
        toast.success(error.message || "Failed Product deletion!");
    }
    
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await deleteCategory(categoryId);
      toast.success(response.message || "Category deleted successfully!");
      loadCategories();
      loadSubCategories();
    } catch (error) {
      toast.error("Failed to delete category. Please try again.");
    }
  };

  const handleDeleteSubCategory = async (subCategoryId) => {
    try {
      const response = await deleteSubCategory(subCategoryId);
      toast.success(response.message || "Subcategory deleted successfully!");

      loadCategories();
      loadSubCategories();
    } catch (error) {
      toast.error("Failed to delete subcategory. Please try again.");
    }
  };

  const logout = () => {
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
      {error && <p className="text-red-500">{error}</p>}
        <h2>Admin Dashboard</h2>
        <ul>
          <li onClick={() => setActiveSection("home")}>Home</li>
          <li onClick={() => setActiveSection("manageProducts")}>Manage Products</li>
          <li onClick={() => setActiveSection("manageCateogy")}>Manage Categories and Sub Categories</li>
          <li onClick={() => setActiveSection("manageOrders")}>Manage Orders</li>
          <li onClick={logout}>Logout</li>
        </ul>
      </div>

      <div className="main-content">
        {activeSection === "home" && (
          <div className="home-section">
            <h1>Welcome to Admin Dashboard</h1>
            <p>Here, you can manage products, categories, and more.</p>
          </div>
        )}

        {activeSection === "manageProducts" && (
          <div className="manage-products">
            <h1>Manage Products</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="add-product-form">
              <div className="product-actions">
                {/* Add Product Section */}
                
                <div className="add-product">
                  <h2>Add New Product</h2>
                  <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    {...register("name", { required: "Product name is required" })}
                  />
                  {errors.name && <p className="error">{errors.name.message}</p>}
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    {...register("price", {
                      required: "Price is required",
                      min: { value: 0, message: "Price cannot be negative" }
                    })}
                  />
                  {errors.name && <p className="error">{errors.name.message}</p>}
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    {...register("quantity", {
                      required: "Quantity is required",
                      min: { value: 0, message: "Quantity cannot be negative" }
                    })}
                  />
                  {errors.quantity && <p className="error">{errors.quantity.message}</p>}
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    {...register("description", { required: "Description is required" })}
                  />
                  {errors.description && <p className="error">{errors.description.message}</p>}
                  
                  <button type="submit">Add Product</button>
                </div>
                
                <div className="product-list">
                <h2>ㅤ</h2>
                  <select {...register("categoryId", { required: "Category is required" })}>
                    <option value="">Select Category</option>
                    {categories1.map(({ _id, name }) => (
                    <option key={_id} value={_id}>
                      {name}
                    </option>
                  ))}
                  </select>
                  {errors.category && <p className="error">{errors.category.message}</p>}

                  <select {...register("subCategoryId", { required: "Subcategory is required" })}>
                    <option value="">Select Subcategory</option>
                    {subcategory1.map(({_id, name}) => (
                      <option key={_id} value={_id}>
                        {name}
                      </option>
                    ))}
                  </select>
                  {errors.subcategory && <p className="error">{errors.subcategory.message}</p>}

                  <select
                    {...register("prescription_required", {
                      required: "Please specify if a prescription is required",
                    })}
                  >
                    <option value="">Prescription Required</option>
                    {prescription_required_string.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.prescription_required && (
                    <p className="error">{errors.prescription_required.message}</p>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    {...register("images")}
                  />
                  {imagePreview?.[0] && (
                    <div className="image-preview">
                      <img
                        src={URL.createObjectURL(imagePreview[0])}
                        alt="Preview"
                        style={{ maxWidth: "100px", marginTop: "10px" }}
                      />
                    </div>
                  )}
                </div>
                

                {/* Product List Section */}
              </div>
            </form>

            <div className="product-list">
                <h2>Product List</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Sub-Category</th>
                      <th>Prescription Required</th>
                      <th>Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td>{product.description}</td>
                        <td>{product.category.name}</td>
                        <td>{product.subcategory.name}</td>
                        <td>{product.prescriptionRequired ? "true" : "false"}</td>
                        <td>
                          <img 
                            src={`https://${process.env.REACT_APP_API_URL}/${product.images}`} 
                            alt={"img"} 
                            // onError={(e) => { e.target.onerror = null; e.target.src = 'path/to/fallback/image.jpg'; }} 
                          />
                        </td>
                        <td>
                          <button onClick={() => handleEditProduct(product)}>Edit</button>
                          <button onClick={() => deleteProduct(product._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          </div>
        )}

        {activeSection === "editProduct" && (
          <div className="edit-product">
            <h1>Edit Product</h1>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (value >= 1) {
                  setNewProduct({ ...newProduct, price: value });
                }
              }}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={newProduct.quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (value >= 1) {
                  setNewProduct({ ...newProduct, quantity: value });
                }
              }}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <select
              name="Category"
            >
              <option value="">Select Category</option>
              {categories1.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                  
                </option>
                
              ))}
            </select>
            <select
              name="subcategory"
            >
              <option value="">Select Subcategory</option>
              {subcategory1.map((subcategory1, index) => (
                <option key={index} value={subcategory1.name}>
                  {subcategory1.name}
                  
                </option>  

              ))}
            </select>
            <select
              name="prescription"
              value={newProduct.prescription}
              onChange={(e) => setNewProduct({ ...newProduct, prescription: e.target.value })}
            >
              <option value="">Select Prescription</option>
              {prescription_required_string.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
            />
            <button onClick={updateProduct}>Update Product</button>
          </div>
        )}

        {activeSection === "manageCateogy" && (
          <div className="manage-products">
          <h1>Manage Categories and subcategories</h1>
            <div className="product-actions">              
              <div className="add-product">
                <h2>Add New Category</h2>
                <input
                  type="text"
                  name="name"
                  placeholder="Category Name"
                  onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                  required
                />
                
                <button onClick={onSubmitCategory}>Add Category</button>
              </div>              
            </div>

            <div className="product-actions">
              <div className="add-product">
                <h2>Add New Sub-Category</h2>
                <input
                  type="text"
                  name="name"
                  placeholder="Sub Category Name"
                  value={subCategoryNameAdd}
                  onChange={(e) => setSubCategoryNameAdd(e.target.value)}
                />
                <select value={selectedCategoryforSubcategory}
                        onChange={(e) => setSelectedCategoryforSubcategory(e.target.value)}>
                    <option value="">Select Category</option>
                    {categories1.map(({ _id, name }) => (
                    <option key={_id} value={_id}>
                      {name}
                    </option>
                  ))}
                  </select>
                
                <button type="submit" onClick={handleAddSubCategory}>Add Sub Category</button>
              </div>
            </div>

          <div className="product-list">
              <h2>Category List</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Associated Sub Categories</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                {categories1.map((cat) => (
                    <tr key={cat._id}>
                      <td>{cat.name}</td>
                      <td>
                        {cat.sub_cat.map((subCategory) => (
                          <div key={subCategory._id}>{subCategory.name}</div>
                        ))}
                      </td>
                      <td>
                        <button>Edit</button>
                        <button onClick={() => handleDeleteCategory(cat._id)}>Delete</button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>

            <div className="product-list">
              <h2>Category List</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                {subcategory1.map((subCat) => (
                    <tr key={subCat._id}>
                      <td>{subCat.name}</td>
                      <td>
                        <button>Edit</button>
                        <button onClick={() => handleDeleteSubCategory(subCat._id)}>Delete</button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
        </div>
        )}

        {activeSection === "manageOrders" && (
          <div className="manage-products">
          <h1>Manage Categories and subcategories</h1>
          <div className="product-list">
              <h2>Order List</h2>
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Transaction ID</th>
                    <th>Products</th>
                    <th>Address</th>
                    <th>Total Price</th>
                    <th>Order Date</th>
                    <th>Last Updated Date</th>
                    <th>Status</th>
                    <th>Assigned Pharmacy</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                {userOrders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.transactionId}</td>
                      <th>{order.items.map((item, index) => (
                          <div key={index}>
                            {item.medicine.name} (x{item.quantity})
                          </div>
                        ))}
                      </th>
                      <td>{order?.shippingAddress?.address} - {order?.shippingAddress?.postalCode} {order?.shippingAddress?.city} {order?.shippingAddress?.country}</td>
                      <td>{order.totalPrice}</td>
                      <td>{formatDate(order.createdAt)}</td>
                      <td>{formatDate(order.updatedAt)}</td>
                      <td>{order.status}</td>
                      <td><select
                            placeholder={order?.pharmacy?.shopName || "Select any pharmacy"}
                            value={order?.pharmacy?.shopName || selectedPharmacies[order._id] || ""}
                            onChange={(e) =>
                              setSelectedPharmacies((prev) => ({
                                ...prev,
                                [order._id]: e.target.value,
                              }))
                            }
                          >
                            <option value="">{order?.pharmacy?.shopName || "Select any pharmacy"}</option>
                            {allPharmacies.map((pharmacy) => (
                              <option key={pharmacy._id} value={pharmacy._id}>
                                {pharmacy.shopName}
                              </option>
                            ))}
                          </select>
                      </td>
                      <td>
                        <button onClick={handleAddPharmacy}>Save</button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
        </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;