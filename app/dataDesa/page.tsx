import Layout from "@/components/Layout";
import Link from "next/link";

const DataDesa = () => {
  return (
    <Layout>
      {" "}
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Data Desa
            </h1>
            <div className="mb-6">
              <Link href="/dataDesa/add">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Tambah Desa
                </button>
              </Link>
            </div>
            <ul>
              <li className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-black">Nama Desa</p>
                  <p className="text-gray-600">Suara Desa</p>
                  <p className="text-gray-600">Kecamatan_id</p>
                  <p className="text-gray-600">paslon_id</p>
                </div>
                <div className="flex space-x-2">
                  <Link href={`/dataDesa/edit`}>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                      Edit
                    </button>
                  </Link>
                  <button
                    // onClick={() => deletePasol(item.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Hapus dari Daftar
                  </button>
                </div>
              </li>
            </ul>

            <p className="font-bold flex justify-center items-center">
              Daftar Dapil Kosong.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default DataDesa;
