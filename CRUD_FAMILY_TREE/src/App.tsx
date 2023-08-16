import axios from "axios";
import { API } from "./utils";
import { useEffect } from "react";
import { useState } from "react";
import { FiMail, FiPlus } from "react-icons/fi";
import {MdDelete} from 'react-icons/md'
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

  const initialFamily: FamilyTypes = {
    familyName: "",
    mother: "",
    father: "",
    children: [],
  };

  interface Children {
    value: string;
    key: string;
  }

  const initialChildren: Children = {
    value: "",
    key: uniqueId(),
  };

  const [family, setFamily] = useState<FamilyTypes>(initialFamily);
  const [children, setChildren] = useState<any>([{ value: "" }]);
  const [FamilyList, setFamilyList] = useState<any>([]);

  const newFamily: FamilyTypes = {
    familyName: family.familyName,
    mother: family.mother,
    father: family.father,
    children: children,
  };

  const addFamily = async (fam: any, child: any) => {
    try {
      const family = await API.post("/createFamily", {
        familyName: fam.familyName,
        mother: fam.mother,
        father: fam.father,
        children: child,
      });
      console.log(family);
      setFamily([]);
      setFamily([]);
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
        console.log(families.data);
        setFamilyList(families.data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchFamily();
  }, []);

  const deleteFam =async(id:any)=>{
      try {
        setFamilyList(FamilyList.filter((fam:any)=> fam._id != id))
        await API.delete('/deleteFamily',{
          data: { _id: id },
        })
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div className="w-full h-screen flex">
      <div className="m-auto w-[80%] h-[80%] border-[10px] ">
        <h1 className="text-center font-bold text-2xl">List of Familes</h1>
        <div className="flex flex-col gap-2 my-2">
        {FamilyList.map((family:any) => (
          <div key={family._id} className=" bg-slate-200 p-2 mx-2 rounded-xl relative">
           <div className="" onClick={()=> deleteFam(family._id)}>
           <MdDelete  className="text-red-500 w-7 h-7 absolute right-5 top-5 hover:scale-125"></MdDelete>
           </div>
            <h1>Family Name: {family.familyName}</h1>
            <h2>Mother: {family.mother}</h2>
            <h2>Father: {family.father}</h2>
            {family.children.map((childArray:any, index:any) => (
            <ul key={index}>
              {childArray.map((child:any, childIndex:any) => (
                <li key={child.key || childIndex}>chil: {child.value}</li>
              ))}
            </ul>
          ))}
          </div>
        ))}
        </div>
        <div className="border-[1px] bg-slate-300 p-10 space-y-3">
          <h1 className="text-center text-2xl font-sans font-bold py-2">
            Family Tree!
          </h1>
          <div className=" space-x-2">
            <label className="font-bold">Family Name</label>
            <input
              value={family.familyName}
              onChange={(e) => handleInputChange("familyName", e.target.value)}
              className="rounded-xl h-10 "
            ></input>
          </div>
          <div className=" space-x-2">
            <label className="font-bold">Mother</label>
            <input
              value={family.mother}
              onChange={(e) => handleInputChange("mother", e.target.value)}
              className="rounded-xl h-10 "
            ></input>
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
                    value={child.value}
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
              addFamily(family, children);
            }}
            className="w-fit hover:scale-105 duration-300 ease-in-out p-2 rounded-md px-5 bg-blue-700">
            Add family
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
