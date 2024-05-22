import AdminNavbar from "@/components/elements/Navbar/AdminNavbar";
import EditVoucherModule from "@/components/modules/EditVoucherModule";

const Page = ({ params }: { params: { id: string } }) => {
    return <div>
        <AdminNavbar/>
        <EditVoucherModule id={params.id}/>
    </div>
}

export default Page;