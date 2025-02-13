"use client";
import {
  Button,
  Checkbox,
  Chips,
  Drawer,
  FloatingLabelInput,
  Modal,
  Radio,
  Switch,
  Text,
  Toaster,
} from "@/shared-components";
import MultiSelectInput from "@/shared-components/src/components/inputs/multi-select-input/multi-select-input";
import { useState } from "react";
import { toast } from "sonner";

const options = [
  { label: "Times Square", value: "times_square" },
  { label: "Grand Central", value: "grand_central" },
  { label: "Union Station", value: "union_station" },
  { label: "Downtown Plaza", value: "downtown_plaza" },
  { label: "Rosewood Mall", value: "rosewood_mall" },
  { label: "Seaside Market", value: "seaside_market" },
  { label: "Maple Avenue", value: "maple_avenue" },
];

const Radioptions = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Disabled Option", value: "option3", disabled: true },
];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center px-4 bg-white text-black">
      <Text variant="headerLarge"> Hello There</Text>
      <Button>Shared Button</Button>
      <Chips variant="success" />
      <FloatingLabelInput placeholder="Enter text..." label="Enter you email" />
      <Checkbox label="Checkbox" />
      <Radio name="radio" options={Radioptions} />
      <div>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Open Drawer
        </Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
      <Switch />
      <MultiSelectInput options={options} />
      <div>
        <Button variant="text" onClick={() => setIsModalOpen(true)}>
          Open Modal
        </Button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="size-[300px] bg-primary-400"></div>
        </Modal>
      </div>
      <div>
        <Toaster />
        <button
          onClick={() => toast("This is a default toast")}
          className="px-4 py-2 rounded bg-gray-100 text-gray-600 max-w-40"
        >
          Show Disabled Toast
        </button>
      </div>
    </div>
  );
}
