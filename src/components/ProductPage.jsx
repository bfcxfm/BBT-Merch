import { Link, useNavigate } from "react-router-dom";

import {
  Activity,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CircleCheckBig,
  CirclePlus,
  CircleUser,
  Copy,
  CreditCard,
  DollarSign,
  Menu,
  MoreVertical,
  Package2,
  Search,
  Truck,
  Users,
  X,
} from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useEffect, useState } from "react";
import { postProduct, updateProduct } from "../../service/users";
import {
  getUser,
  logoutUser,
  getAllOrderDetails,
  updateOrderDetails,
  getAdmin,
  getAllProduct,
} from "../../service/users";
import { Separator } from "./ui/separator";
import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(getUser);
  const [admin, setAdmin] = useState(getAdmin);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const navigate = useNavigate();

  const updateDone = { status: "completed" };
  const updateCancel = { status: "cancelled" };

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        setUser(getUser()); // Update state after logout is complete
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [currentProduct]);

  async function fetchProducts() {
    try {
      const productData = await getAllProduct();
      const sortedProducts = productData.data.sort((a, b) =>
        a.category.localeCompare(b.category)
      );
      setProducts(sortedProducts);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  }

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Update the product in the backend and get the updated product
      const updatedProduct = await updateProduct(currentProduct._id, {
        name: currentProduct.name,
        category: currentProduct.category,
        price: currentProduct.price,
      });

      console.log("Product updated successfully:", updatedProduct);

      // Update products state to reflect the changes
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      );

      // Close the edit modal and reset form state
      setIsEditModalOpen(false);

      console.log("Product updated successfully:", updatedProduct);
    } catch (error) {
      console.error("Failed to save changes:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  //handleSaveChanges should probably be integrated with handleproductEdit
  const handleProductEdit = async (productId) => {
    // Optimistically update local state
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId
          ? { ...product, inStock: !product.inStock }
          : product
      )
    );

    try {
      // Find the product to update from the current products state
      const productToUpdate = products.find(
        (product) => product._id === productId
      );

      if (productToUpdate) {
        // Update the product status in the backend
        const updatedProduct = await updateProduct(productId, {
          inStock: !productToUpdate.inStock,
        });

        // Update state with the updated product from the backend response
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === updatedProduct._id ? updatedProduct : product
          )
        );
      }
    } catch (error) {
      console.error("Failed to update the product:", error);
      // Optionally revert state to its original state or handle error gracefully
      // Here you may want to rollback the state change if the backend update fails
      // For simplicity, we are not implementing the rollback in this example
    }
  };
  // console.log(user);

  return (
    <>
      {admin && (
        <div className="flex min-h-screen w-full flex-col">
          <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
              <Link
                to="/"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">BBT</span>
              </Link>
              <Link
                to="/admin"
                relative="path"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                to="/admin"
                relative="path"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                to="/admin/product"
                relative="path"
                className="text-foreground  transition-colors hover:text-foreground"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Customers
              </Link>
            </nav>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    to="/"
                    relative="path"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">BBT</span>
                  </Link>
                  <Link
                    to="/admin"
                    relative="path"
                    className="hover:text-foreground"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin"
                    relative="path"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Orders
                  </Link>
                  <Link
                    to="/admin/product"
                    relative="path"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Products
                  </Link>
                  <Link
                    to="/admin/users"
                    relative="path"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Customers
                  </Link>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Analytics
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
              <form className="ml-auto flex-1 sm:flex-initial">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  />
                </div>
              </form>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    {user ? (
                      <button onClick={handleLogout}>Logout</button>
                    ) : (
                      <Link to="/login" relative="path">
                        Login
                      </Link>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 p-4">
            <h2 className="text-xl font-semibold py-2">Products</h2>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 lg:mt-4 xl:grid-cols-3">
              {products.map((product, index) => (
                <Card key={index} className="xl:col-span-1">
                  <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.category}</CardDescription>
                    </div>
                    <Button asChild size="sm" className="ml-auto gap-1">
                      <Link to="#" onClick={() => handleEditClick(product)}>
                        Edit
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Price</TableCell>
                          <TableCell>${product.price.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            In Stock
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              onClick={() => handleProductEdit(product._id)}
                              className={`cursor-pointer ${
                                product.inStock ? "bg-green-500" : "bg-red-500"
                              }`}
                            >
                              {product.inStock ? "Yes" : "No"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      )}

      {isEditModalOpen && (
        <div className="col-span-1 sm:col-start-2 sm:-mt-10 lg:col-start-6 lg:mr-20 pt-8 mx-auto">
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                Edit Product
                <CirclePlus className="w-5 h-5 ml-2" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md max-h-screen overflow-auto">
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogDescription>Update product details</DialogDescription>
              </DialogHeader>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  name="name"
                  value={currentProduct.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <Input
                  name="category"
                  value={currentProduct.category}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Price</label>
                <Input
                  name="price"
                  value={currentProduct.price}
                  onChange={handleInputChange}
                />
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <Button onClick={handleSaveChanges}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
}
