'use client';
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button, Card, CardBody, CardFooter, Collapse, Dialog, IconButton, Input, MobileNav, Navbar, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";


export default function TopNavBar(){
    const pathName = usePathname();
    const [isLogin, setLogin] = useState(false);
    const [openNav, setOpenNav] = useState(false);
    const isHomePage = pathName === "/";

    useEffect(() => {
        window.addEventListener(
            'resize',
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const handleLogin = () => setLogin((cur) => !cur);

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap:6">
            <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
                <Link href="/properties">
                    <span>Listing</span>
                </Link>
            </Typography>
            <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
                <Link href="/policies">
                    <span>Policy</span>
                </Link>
            </Typography>
        </ul>
    )

    return (
        <Navbar className="absolute flex justify-center top-0 z-10 h-max max-w-full rounded-none px-8 py-2 lg:px-10 lg:py-4">
            <div className="w-full max-w-[65rem]">
            <div className="flex w-full items-center justify-between text-blue-gray-900">
                <Typography as="div" href="/" className="mx-4 cursor-pointer py-1.5 text-lg font-medium">
                    <Link href="/">
                        Bravolet
                    </Link>
                </Typography>
                <div className="flex items-center gap-4">
                    <div className="mr-4 hidden lg:block">
                        {navList}
                    </div>
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={()=>setOpenNav(!openNav)}
                    >
                        {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                        ) }
                    </IconButton>
                </div>
                <Button onClick={handleLogin}>
                    Login
                </Button>
                <Dialog size="xs" open={isLogin} handler={handleLogin} className="bg-transparent shadow-none">
                    <Card className="mx-auto w-full max-w-[24rem]">
						<CardBody className="flex flex-col gap-4">
							<Typography variant="h4" color="blue-gray">
								Sign In
							</Typography>
							<Typography className="mb-3 font-normal" variant="paragraph" color="gray">
								Enter your email and password to Sign In.
							</Typography>
							<Typography className="-mb-2" variant="h6">Your Email</Typography>
							<Input label="Email" size="lg" />
							<Typography className="-mb-2" variant="h6">Your Password</Typography>
							<Input label="Password" size="lg" />
						</CardBody>
						<CardFooter className="pt-0">
							<Button variant="gradient" onClick={handleLogin} fullWidth>
								Sign In
							</Button>
						</CardFooter>
                    </Card>
                </Dialog>
            </div>
            <Collapse open={openNav}>
                {navList}
            </Collapse>
            </div>
        </Navbar>
    )
}