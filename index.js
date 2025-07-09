import express from "express"
import dotenv from "dotenv"
import productRoutes from "./routes/productRoutes"
import cartRoutes from "./routes/productRoutes"
import wishlistRoutes from "./routes/productRoutes"

dotenv.config();

const app = express();
const PORT = 4000 || process.env.PORT;

//MIdderware 
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());
connectDB() ;

//Router

app.use('/api/user', userRouter);

app.get('/', (req, res) =>{
    res.send("Welcome to Doorcart Backend");
})

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes)

app.listen(PORT, () =>{
    console.log(`App listing in the port ${PORT}`)
})