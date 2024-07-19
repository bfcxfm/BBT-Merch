import { Link, useNavigate } from "react-router-dom";

import {
  Activity,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CircleCheckBig,
  CircleUser,
  Copy,
  CreditCard,
  DollarSign,
  Menu,
  MoreVertical,
  Package2,
  Receipt,
  Search,
  Truck,
  Users,
  X,
} from "lucide-react";

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
import {
  getUser,
  logoutUser,
  getAllOrderDetails,
  updateOrderDetails,
  getAdmin,
} from "../../service/users";
import { Separator } from "./ui/separator";
import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination";

export default function Dashboard() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  //console.log(selectedOrder);

  const [user, setUser] = useState(getUser);
  const [admin, setAdmin] = useState(getAdmin);
  const navigate = useNavigate();

  //console.log(user);

  const updateDone = { status: "completed" };
  const updateCancel = { status: "cancelled" };

  async function fetchOrders() {
    try {
      const orderData = await getAllOrderDetails();
      const ordersList = orderData.data;

      setOrders(ordersList.reverse());

      // Calculate total revenue from completed orders
      const completedOrders = ordersList.filter(order => order.status === "completed");
      const revenue = completedOrders.reduce((acc, order) => acc + (order.total * 0.4), 0);
setTotalRevenue(revenue); // Update total revenue state

      if (!selectedOrder && ordersList.length > 0) {
        setSelectedOrder(ordersList[0]);
      }
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  }

  // console.log(user);

  async function completeOrder(orderId) {
    try {
      const res = await updateOrderDetails(orderId, updateDone);
      //console.log("complete",res);

      if (!res.success) {
        throw new Error(`Failed to complete order: ${res.statusText}`);
      }
      fetchOrders();
      const updatedOrder = { ...selectedOrder, status: "Completed" };
      setSelectedOrder(updatedOrder);
    } catch (error) {
      console.error(`Error completing order ${orderId}:`, error);
    }
  }

  async function cancellOrder(orderId) {
    try {
      const res = await updateOrderDetails(orderId, updateCancel);
      //console.log("cancel",res);

      if (!res.success) {
        throw new Error(`Failed to cancel order: ${res.statusText}`);
      }
      const updatedOrder = { ...selectedOrder, status: "cancelled" };
      setSelectedOrder(updatedOrder);

      fetchOrders();
    } catch (error) {
      console.error(`Error cancelling order ${orderId}:`, error);
    }
  }

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

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    //console.log(selectedOrder);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      {admin && (
        <div className="flex min-h-screen w-full flex-col">
          <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
              <Link
                to="/"
                relative="path"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">BBT</span>
              </Link>
              <Link
                href="#"
                className="text-foreground transition-colors hover:text-foreground"
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
                className="text-muted-foreground hover:text-foreground"
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
            <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 ">ADMIN</div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    22.1% profit margins
                  </p>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Cost
                  </CardTitle>
                  <Receipt className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$35,222.65</div>
                  <p className="text-xs text-muted-foreground">
                    +30% from last month
                  </p>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Orders Now
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 lg:mt-4 xl:grid-cols-3">
              <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Transactions</CardTitle>
                    <CardDescription>Recent transactions.</CardDescription>
                  </div>
                  <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="#">
                      View All
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead className="hidden xl:table-column">
                          Type
                        </TableHead>
                        <TableHead className="hidden xl:table-column">
                          Status
                        </TableHead>
                        <TableHead className="hidden xl:table-column">
                          Date
                        </TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order, index) => (
                        <TableRow
                          key={index}
                          onClick={() => handleOrderSelect(order)}
                        >
                          <TableCell>
                            <div className="font-medium ">{order.orderID}</div>
                            <Badge
                              variant="outline"
                              className="hidden text-sm text-muted-foreground font-semibold md:inline"
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden xl:table-column">
                            Sale
                          </TableCell>
                          <TableCell className="hidden xl:table-column">
                            <Badge className="text-xs" variant="outline">
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                            {formatDate(order.createdAt)}
                          </TableCell>
                          <TableCell className="text-right">
                            ${order.total.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}

                      {/* <TableRow>
                    <TableCell>
                      <div className="font-medium">Liam Johnson</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        liam@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Sale
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-23
                    </TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Olivia Smith</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        olivia@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Refund
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Declined
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-24
                    </TableCell>
                    <TableCell className="text-right">$150.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Noah Williams</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        noah@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Subscription
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-25
                    </TableCell>
                    <TableCell className="text-right">$350.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Emma Brown</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        emma@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Sale
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-26
                    </TableCell>
                    <TableCell className="text-right">$450.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Liam Johnson</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        liam@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Sale
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-27
                    </TableCell>
                    <TableCell className="text-right">$550.00</TableCell>
                  </TableRow> */}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              {selectedOrder && (
                <Card x-chunk="dashboard-01-chunk-5">
                  <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                      <CardTitle className="group flex items-center gap-2 text-lg">
                        Order {selectedOrder && selectedOrder.orderID}
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <Copy className="h-3 w-3" />
                          <span className="sr-only">Copy Order ID</span>
                        </Button>
                      </CardTitle>
                      <CardDescription>
                        Date: {formatDate(selectedOrder.createdAt)}
                        <div className="font-semibold bg-black text-white mx-auto w-auto rounded-md">
                          {selectedOrder.status}
                        </div>
                      </CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 gap-1"
                          >
                            <CircleCheckBig className="h-3.5 w-3.5" />
                            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                              Done
                            </span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Confirm Order Completion?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will complete
                              the order.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => completeOrder(selectedOrder._id)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-3.5 w-3.5" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Export</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              {/* <Button size="icon" variant="destructive"><X className="h-3.5 w-3.5"/></Button> */}
                              <Button
                                size="sm"
                                variant="destructive"
                                className="h-8 gap-1"
                              >
                                <X className="h-5 w-5" />
                                <span className="xl:not-sr-only xl:whitespace-nowrap">
                                  Cancel Order
                                </span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Confirm Order Cancellation?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will cancel
                                  the order.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    cancellOrder(selectedOrder._id)
                                  }
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                      <div className="font-semibold">Order Details</div>
                      <ul className="grid gap-3">
                        {selectedOrder.drinks.map((drink, index) => (
                          <li className="flex flex-col gap-1" key={index}>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">
                                {drink.mainProduct.name} x{" "}
                                <span>{drink.quantity}</span>
                              </span>
                              <span>${drink.mainProduct.price.toFixed(2)}</span>
                            </div>
                            {drink.toppings &&
                              drink.toppings.map((topping, tIndex) => (
                                <div
                                  className="flex items-center justify-between pl-4"
                                  key={tIndex}
                                >
                                  <span className="text-muted-foreground">
                                    {topping.topping.name} x{" "}
                                    <span>{topping.quantity}</span>
                                  </span>
                                  <span>
                                    $
                                    {(
                                      topping.topping.price * topping.quantity
                                    ).toFixed(2)}
                                  </span>
                                </div>
                              ))}
                            {drink.comment &&
                              drink.comment.map((comment, cIndex) => (
                                <div
                                  key={cIndex}
                                  className="flex flex-col gap-1 mt-2 pl-4"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                      Sugar
                                    </span>
                                    <span>{comment.sugar}</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                      Sugar Level
                                    </span>
                                    <span>{comment.sugarLevel}</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                      Ice Level
                                    </span>
                                    <span>{comment.iceLevel}</span>
                                  </div>
                                  {/* <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Rating</span>
                        <span>{comment.rating} / 5</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Created At</span>
                        <span>{formatDate(comment.createdAt)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Updated At</span>
                        <span>{formatDate(comment.updatedAt)}</span>
                      </div> */}
                                  <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                      Comment
                                    </span>
                                    <span>{comment.content}</span>
                                  </div>
                                </div>
                              ))}
                          </li>
                        ))}
                      </ul>
                      <Separator className="my-2" />
                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Subtotal
                          </span>
                          <span>${selectedOrder.total.toFixed(2)}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Shipping
                          </span>
                          <span>$0.00</span>
                        </li>
                        {/* <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>$25.00</span>
                  </li> */}
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground">Total</span>
                          <span>${selectedOrder.total.toFixed(2)}</span>
                        </li>
                      </ul>
                    </div>
                    {/* <Separator className="my-4" />
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <div className="font-semibold">Shipping Information</div>
                  <address className="grid gap-0.5 not-italic text-muted-foreground">
                    <span>Liam Johnson</span>
                    <span>1234 Main St.</span>
                    <span>Anytown, CA 12345</span>
                  </address>
                </div>
                <div className="grid auto-rows-max gap-3">
                  <div className="font-semibold">Billing Information</div>
                  <div className="text-muted-foreground">
                    Same as shipping address
                  </div>
                </div>
              </div> */}
                    {/* <Separator className="my-4" />
              <div className="grid gap-3">
                <div className="font-semibold">Customer Information</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Customer</dt>
                    <dd>Liam Johnson</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Email</dt>
                    <dd>
                      <a href="mailto:">liam@acme.com</a>
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Phone</dt>
                    <dd>
                      <a href="tel:">+1 234 567 890</a>
                    </dd>
                  </div>
                </dl>
              </div> */}
                    <Separator className="my-4" />
                    <div className="grid gap-3">
                      <div className="font-semibold">Payment Information</div>
                      <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                          <dt className="flex items-center gap-1 text-muted-foreground">
                            <CreditCard className="h-4 w-4" />
                            Visa
                          </dt>
                          <dd>**** **** **** 4532</dd>
                        </div>
                      </dl>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                    <div className="text-xs text-muted-foreground">
                      Updated{" "}
                      <time dateTime="2023-11-23">
                        {formatDate(selectedOrder.updatedAt)}
                      </time>
                    </div>
                    <Pagination className="ml-auto mr-0 w-auto">
                      <PaginationContent>
                        <PaginationItem>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-6 w-6"
                          >
                            <ChevronLeft className="h-3.5 w-3.5" />
                            <span className="sr-only">Previous Order</span>
                          </Button>
                        </PaginationItem>
                        <PaginationItem>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-6 w-6"
                          >
                            <ChevronRight className="h-3.5 w-3.5" />
                            <span className="sr-only">Next Order</span>
                          </Button>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </CardFooter>
                </Card>
              )}
            </div>
          </main>
        </div>
      )}
    </>
  );
}
