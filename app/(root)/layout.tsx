import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const loggedIn = await getLoggedInUser ();
  if(!loggedIn) redirect('/sign-in')
  return (

    <main className = 'flex h-screen w-full font-inter'>
        <Sidebar user={loggedIn}/>

        <div className ='flex size-full flex-col'>
            <div className="root-layout">
              <Image src='/icons/Mlogo.svg' width={100} height= {100} alt='menu-icon'/>
              <div>
                <MobileNav user={loggedIn}/>
              </div>
            </div>
            {children}
        </div>
    </main>
  );
}
