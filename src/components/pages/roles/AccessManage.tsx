import React, { FormEvent } from "react";
import getApi from "../../../services/api/getApi";

const AccessManage = () => {
    const api = getApi();

    const onSaveSubmit = (e: FormEvent<HTMLFormElement>) => {};
    return (
        <div className="shadow-sm mb-6 relative min-w-full">
            <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6 border-b border-slate-200">
                            <div className="text-center flex justify-between">
                                <h6 className="text-slate-700 text-xl font-bold">Create Role</h6>
                            </div>
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form>
                                <h6 className="text-slate-800 text-sm mt-3 mb-6 font-bold uppercase">
                                    Role Information
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Role name"
                                            className="border-0 px-3 py-3 placeholder-slate-400 text-slate-900 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                    </div>

                                    <div className="relative w-full">
                                        <button className="bg-blue-500 px-4 py-2 rounded-md text-white">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6 border-b border-slate-200">
                            <div className="text-center flex justify-between">
                                <h6 className="text-slate-700 text-xl font-bold">Create Role</h6>
                            </div>
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-5">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-white border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-3">Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-6 py-3">Admi</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccessManage;
