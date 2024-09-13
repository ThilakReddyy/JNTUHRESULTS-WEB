"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { ArrowRightIcon, ListFilter, SearchIcon, XIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { countries } from "@/constants/countries";
import axios from "axios";
import { Input } from "../ui/input";

interface Option {
  label: string;
  key: string;
}

interface Form {
  [key: string]: string;
}

interface Filter {
  name: string;
  options: Option[];
}

interface Filters {
  [key: string]: Filter;
}

interface CareerFilterProps {
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

const CareerFilters: React.FC<CareerFilterProps> = ({ form, setForm }) => {
  const [isActive, setIsActive] = useState<string>("type");
  const [options, setOptions] = useState<Option[]>([]);

  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState<Filters>({
    type: {
      name: "Type",
      options: [
        { key: "F", label: "In-office" },
        { key: "T", label: "Remote" },
      ],
    },
    experience: {
      name: "Experience",
      options: [
        { key: "0", label: "No Experience" },
        { key: "1", label: "1 year Exp" },
        { key: "2", label: "2 years Exp" },
        { key: "3", label: "3 years Exp" },
        { key: "5", label: "5 years Exp" },
        { key: "8", label: "8 years Exp" },
        { key: "13", label: "13+ years Exp" },
      ],
    },
    location: {
      name: "Location",
      options: countries, // Assume countries is an array of Option
    },
    company: {
      name: "Company",
      options: [], // Company options should be set dynamically or from a source
    },
    status: {
      name: "Status",
      options: [
        { key: "false", label: "On-Live" },
        { key: "true", label: "Expired" },
      ],
    },
    dateposted: {
      name: "Date Posted",
      options: [
        {
          key: "today",
          label: "Today",
        },
        {
          key: "yesterday",
          label: "Yesterday",
        },
        {
          key: "past_7_days",
          label: "Past 7 Days",
        },
        {
          key: "before_past_7_days",
          label: "Before Past 7 Days",
        },
      ], // Date posted options should be set dynamically or from a source
    },
  });

  const filterKeys = Object.keys(filters);
  useEffect(() => {
    setOptions(filters[isActive]?.options || []);
  }, [isActive, filters]);

  const handleSearch = () => {
    setForm((prevForm) => ({
      ...prevForm,
      title: searchInput,
    }));
  };

  useEffect(() => {
    const getCompanies = async () => {
      const url = "https://jobss.up.railway.app/companies";
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          const companies = response.data.companies.map((company: string) => ({
            key: company, // Assuming company name is unique
            label: company,
          }));

          // Update the filters state with the fetched company options
          setFilters((prevFilters) => ({
            ...prevFilters,
            company: {
              ...prevFilters.company,
              options: companies,
            },
          }));
          response.data.companies;
        }
      } catch (err) {
        console.log("Error occured while fetching companies");
      }
    };
    getCompanies();
  }, []);

  const handleOptionChange = (optionKey: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [isActive]: optionKey,
    }));
  };

  return (
    <div className="w-full p-2 rounded  bg-gray-50 dark:bg-gray-800">
      <div className="h-14 dark:border-gray-700 bg-white border w-full p-2 rounded-md dark:bg-gray-900 overflow-y-scroll overflow-x-none scroll-smooth no-scrollbar">
        <div className="md:justify-normal justify-around lg:flex items-center grid grid-cols-3 overflow-x-none">
          <div className="flex justify-center md:px-2">
            <Select
              onValueChange={(event) => {
                setForm((prevForm) => ({
                  ...prevForm,
                  job: event,
                }));
              }}
              value={form.job}
            >
              <SelectTrigger className="min-w-[100px] w-fit h-8 bg-blue-500 text-white font-semibold text-xs rounded-full">
                <SelectValue placeholder="Internship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="intern">Internship</SelectItem>
                <SelectGroup>
                  <SelectItem value="fulltime">Full-Time</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-center border-x md:px-2 ">
            <Select>
              <SelectTrigger className="w-fit min-w-[100px] h-8 text-xs rounded-full bg-transparent">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort By</SelectLabel>
                  <SelectItem value="date">Date</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="lg:flex hidden lg:flex-1">
            <div className="flex flex-1">
              {filterKeys.map((key) => (
                <div className="flex justify-center md:px-2 w-full" key={key}>
                  <Select
                    onValueChange={handleOptionChange}
                    value={form[key]}
                    onOpenChange={() => setIsActive(key)}
                  >
                    <SelectTrigger className="min-w-[130px]  w-fit h-8 focus:outline-offset-0 focus:ring-offset-0 focus:ring-0  text-black dark:text-white font-semibold text-xs rounded-full">
                      <SelectValue placeholder={filters[key].name} />
                    </SelectTrigger>
                    <SelectContent className="w-fit">
                      <SelectGroup>
                        {filters[key].options.map((option) => (
                          <SelectItem value={option.key} key={option.key}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
            <div className="flex flex-1 border-l gap-1 border-solid px-2 ">
              <Input
                className="md:h-[32px]"
                placeholder="Search the job here..."
                onChange={(event) => {
                  setSearchInput(event.target.value);
                }}
              />
              <div
                className="p-2 flex border max-h-[32px] rounded justify-center items-center cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 dark:bg-black"
                onClick={handleSearch}
              >
                <SearchIcon size={18} />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center lg:hidden">
            <Drawer>
              <DrawerTrigger>
                <div className="w-fit min-w-[90px] flex justify-center border-[#E2E8F0] gap-1 items-center h-8 text-xs rounded-full border border-solid">
                  Filter
                  <ListFilter size="14" />
                </div>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="flex justify-between border-b">
                  <DrawerTitle className="font-semibold">Filters</DrawerTitle>
                  <DrawerClose>
                    <XIcon className="cursor-pointer" />
                  </DrawerClose>
                </DrawerHeader>

                <div className="flex h-[calc(100vh-50vh)] min-h-fit">
                  <div className="w-[40%] border-r p-4 gap-2 flex flex-col overflow-scroll">
                    {filterKeys.map((key) => (
                      <div
                        className={`p-4 flex text-xs gap-2 rounded-lg items-center text-[#3F3F3F]  ${
                          isActive === key
                            ? "bg-[#E5F0FD] dark:bg-[#3F3F3F]"
                            : ""
                        } cursor-pointer`}
                        key={key}
                        onClick={() => setIsActive(key)}
                      >
                        <span className="text-[#3F3F3F] dark:text-white">
                          {filters[key].name}
                        </span>
                        {form[key] !== "" && (
                          <div className="bg-red-600 rounded-full w-1 h-1 flex justify-center"></div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="w-[60%] flex flex-col">
                    <div className="border-b px-2 py-1 text-sm flex justify-between items-center font-semibold">
                      <div>{filters[isActive]?.name}</div>
                      <Button
                        variant="outline"
                        className="justify-center text-red-600 text-xs p-4"
                        onClick={() =>
                          setForm((prevForm) => ({
                            ...prevForm,
                            [isActive]: "",
                          }))
                        }
                      >
                        Clear
                      </Button>
                    </div>
                    <div className="p-4 overflow-auto">
                      <RadioGroup
                        value={form[isActive]}
                        onValueChange={handleOptionChange}
                        className="overflow-none h-fit"
                      >
                        {options.map((option) => (
                          <div
                            className="flex items-center space-x-2 "
                            key={option.key}
                          >
                            <RadioGroupItem
                              value={option.key}
                              id={option.key}
                              className="text-sm text-blue-500 border-blue-500"
                            />
                            <Label htmlFor={option.key} className="text-sm">
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                <DrawerFooter className="p-4 flex justify-end flex-row border-t ">
                  <DrawerClose>
                    <div
                      className="font-medium justify-end text-red-600 text-xs h-10 px-4 py-2  flex gap-1 items-center  rounded-full     hover:bg-primary/90"
                      onClick={() => {
                        // Logic for canceling filter
                      }}
                    >
                      Cancel Filter
                    </div>
                  </DrawerClose>
                  <div>
                    <DrawerClose>
                      <div className="h-10 px-4 py-2 justify-end flex gap-1 items-center bg-blue-600 rounded-full text-xs dark:text-white  text-primary-foreground hover:bg-primary/90">
                        <ArrowRightIcon size="16" />
                        Apply Filter
                      </div>
                    </DrawerClose>
                  </div>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerFilters;
