import axios from "axios";
import { API } from "./utils";
import { useEffect } from "react";
import { useState } from "react";
import { FiMail, FiPlus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { toastSuccess } from "./utils";
function App() {
  const uniqueId = () => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };
  interface FamilyTypes {
    familyName: string;
    mother: string;
    father: string;
    children: string[];
  }

  interface Children {
    value: string;
    key: string;
  }

  const initialChildren: Children = {
    value: "",
    key: uniqueId(),
  };
  const [selectedFamilyId, setSelectedFamilyId] = useState<string | null>(null);

  const [family, setFamily] = useState<FamilyTypes>({
    familyName: "",
    mother: "",
    father: "",
    children: [],
  });

  const [children, setChildren] = useState<any>([]);
  const [FamilyList, setFamilyList] = useState<any>([]);
  const addFamily = async (fam: any, child: any) => {
    try {
      const family = await API.post("/createFamily", {
        familyName: fam.familyName,
        mother: fam.mother,
        father: fam.father,
        children: child,
      });
      setFamilyList([...FamilyList, family.data.newFam]);
      setChildren([]);
      setFamily({
        familyName: "",
        mother: "",
        father: "",
        children: [],
      });
      toastSuccess("Success fully added Family!");
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (field: keyof FamilyTypes, value: string) => {
    setFamily((prevFamily) => ({
      ...prevFamily,
      [field]: value,
    }));
  };
  const handleChildren = (key: string, value: "") => {
    const updatedOptions = children.map((opt: any) => {
      return opt.key === key ? { ...opt, value: value } : opt;
    });
    // console.log(options)
    setChildren(updatedOptions);
  };
  const addChildren = () => {
    setChildren(() => [...children, { value: "", key: uniqueId() }]);
  };

  useEffect(() => {
    const fetchFamily = async () => {
      try {
        const families = await API.get("/getFamily");
        setFamilyList(families.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFamily();
  }, []);

  const deleteFam = async (id: any) => {
    try {
      setFamilyList(FamilyList.filter((fam: any) => fam._id != id));
      await API.delete("/deleteFamily", {
        data: { _id: id },
      });
      toastSuccess("Success fully deleted Family!");
    } catch (error) {
      console.log(error);
    }
  };

  const updateFamily = async (id: string, fam: any, child: any) => {
    try {
      const updatedFamily = await API.put(`/updateFamily/${id}`, {
        familyName: fam.familyName,
        mother: fam.mother,
        father: fam.father,
        children: child,
      });
  
      setFamilyList((prevList: any) =>
        prevList.map((fam: any) =>
          fam._id === id ? updatedFamily.data.updatedFam : fam
        )
      );
  
      setChildren([]);
      setFamily({
        familyName: '',
        mother: '',
        father: '',
        children: [],
      });
  
      toastSuccess('Successfully updated Family!');
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleUpdate = (id: any) => {
    const family = FamilyList.find((fam: any) => fam._id === id);
    setFamily({
      familyName: family.familyName,
      mother: family.mother,
      father: family.father,
      children: family.children,
    });
    setSelectedFamilyId(id);
  };

  return (
    <div className="w-full h-screen flex">
      <div className="m-auto w-[80%] h-fit border-[10px ">
        <h1 className="text-center font-bold text-2xl">List of Families</h1>
        <div className="flex flex-col gap-2 my-2">
          {FamilyList?.map((family: any) => (
            <div
              key={family._id}
              className="bg-slate-200 p-2 mx-2 rounded-xl relative hover:scale-[1.01] duration-300 ease-in-out"
            >
              <div className="" onClick={() => deleteFam(family._id)}>
                <MdDelete className="text-red-500 w-7 h-7 absolute right-5 top-5 hover:scale-125"></MdDelete>
              </div>
              <button
                onClick={() => handleUpdate(family._id)}
                className="bg-blue-500 w-fit p-2 rounded-lg absolute right-5 bottom-5 hover:scale-125"
              >
                update
              </button>
              <h1>
                Family Name:{" "}
                <span className="font-bold">{family.familyName}</span>{" "}
              </h1>
              <h2>Mother: {family.mother}</h2>
              <h2>Father: {family.father}</h2>
              <h3>Children:</h3>
              {family.children.map((childArray: any, index: any) => (
                <ul key={index}>
                  {childArray.map((child: any, childIndex: any) => (
                    <li key={child.key || childIndex}>{child.value}</li>
                  ))}
                </ul>
              ))}
            </div>
          ))}
        </div>
        <div className="border-[1px] bg-slate-300 p-10 space-y-3">
          <h1 className="text-center text-2xl font-sans font-bold py-2">
            Add a Family
          </h1>
          <div className=" space-x-2">
            <label className="font-bold">Family Name</label>
            <input
              value={selectedFamilyId ? family.familyName : ""}
              onChange={(e) => handleInputChange("familyName", e.target.value)}
              className="rounded-xl h-10"
            />
          </div>
          <div className=" space-x-2">
            <label className="font-bold">Mother</label>
            <input
              value={selectedFamilyId ? family.mother : ""}
              onChange={(e) => handleInputChange("mother", e.target.value)}
              className="rounded-xl h-10"
            />
          </div>
          <div className=" space-x-2">
            <label className="font-bold">Father</label>
            <input
              value={family.father}
              onChange={(e) => handleInputChange("father", e.target.value)}
              className="rounded-xl h-10 "
            ></input>
          </div>
          <div className=" space-x-2">
            <label className="font-bold">Children</label>
            {children.map((child: any, idx: any) => (
              <div key={idx} className="">
                <div
                  className="flex items-center w-full border-[1px gap-2 my-1"
                  key={idx}
                >
                  <input
                    type="text"
                    value={
                      selectedFamilyId
                        ? family.children[idx]?.valueOf || ""
                        : child.value
                    }
                    onChange={(event: any) =>
                      handleChildren(child.key, event.target.value)
                    }
                    placeholder="input choices here.."
                  ></input>
                </div>
              </div>
            ))}

            <div className="border-[1px hover:scale-105  w-fit">
              <button
                onClick={() => {
                  addChildren();
                }}
                className="border-[1px"
              >
                <FiPlus className=" w-7 h-7  ease-out duration-200" />
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              if (selectedFamilyId) {
                updateFamily(selectedFamilyId, family, children);
              } else {
                addFamily(family, children);
              }
              setSelectedFamilyId(null); // Clear selected family after update/add
            }}
            className="w-fit hover:scale-105 duration-300 ease-in-out p-2 rounded-md px-5 bg-green-400"
          >
            {selectedFamilyId ? "Update Family" : "Add Family"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
