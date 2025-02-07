"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { CalendarIcon, PlusCircle, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { israeliGrades, gradeToHebrewName } from "@/lib/mockData";

const phoneSchema = z.object({
  title: z.string().min(1, { message: "יש לבחור כותרת" }),
  number: z.string().regex(/^05\d{8}$/, { message: "מספר טלפון לא תקין" }),
});

const formSchema = z.object({
  firstName: z.string().min(2, { message: "שם פרטי חייב להכיל לפחות 2 תווים" }),
  lastName: z.string().min(2, { message: "שם משפחה חייב להכיל לפחות 2 תווים" }),
  birthDate: z.date({ required_error: "יש לבחור תאריך לידה" }),
  joinDate: z.date({ required_error: "יש לבחור תאריך הצטרפות" }),
  grade: z.number().min(1).max(12),
  city: z.string().min(2, { message: "שם העיר חייב להכיל לפחות 2 תווים" }),
  street: z.string().min(2, { message: "שם הרחוב חייב להכיל לפחות 2 תווים" }),
  houseNumber: z.string().min(1, { message: "יש להזין מספר בית" }),
  phones: z
    .array(phoneSchema)
    .min(1, { message: "יש להזין לפחות מספר טלפון אחד" }),
  hobbies: z
    .array(z.string())
    .min(1, { message: "יש לבחור לפחות תחביב אחד" })
    .default([]),
  customHobby: z.string().optional(),
});

const predefinedHobbies = [
  "כדורגל",
  "ריקוד",
  "ציור",
  "נגינה",
  "קריאה",
  "טיולים",
  "בישול",
  "צילום",
  "אחר",
];

const phoneTitles = ["עצמי", "אמא", "אבא", "אחר"];

interface MemberFormProps {
  initialData?: z.infer<typeof formSchema> & { id?: number };
}

export default function MemberForm({ initialData }: MemberFormProps) {
  const [birthDate, setBirthDate] = useState<Date | undefined>(
    initialData?.birthDate ? new Date(initialData.birthDate) : undefined
  );
  const [joinDate, setJoinDate] = useState<Date | undefined>(
    initialData?.joinDate ? new Date(initialData.joinDate) : undefined
  );
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>(
    initialData?.hobbies || []
  );
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      phones: [{ title: "", number: "" }],
      hobbies: [],
      grade: 1,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phones",
  });

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(key as any, value);
      });
      setSelectedHobbies(initialData.hobbies);
    }
  }, [initialData, setValue]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = {
      ...data,
      hobbies: selectedHobbies,
      customHobby: selectedHobbies.includes("אחר")
        ? data.customHobby
        : undefined,
    };

    const url = initialData
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/members/${initialData.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/members`;

    const method = initialData ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save member");
      }

      const result = await response.json();
      console.log(result);

      if (initialData) {
        alert("חבר עודכן בהצלחה!");
      } else {
        alert("חבר נוסף בהצלחה!");
      }
      router.push("/search");
    } catch (error) {
      console.error("Error:", error);
      alert("אירעה שגיאה בשמירת החבר");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">שם פרטי</Label>
          <Input
            id="firstName"
            {...register("firstName")}
            placeholder="שם פרטי"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName">שם משפחה</Label>
          <Input
            id="lastName"
            {...register("lastName")}
            placeholder="שם משפחה"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>תאריך לידה</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-right"
              >
                {birthDate ? (
                  format(birthDate, "dd/MM/yyyy", { locale: he })
                ) : (
                  <span>בחר תאריך לידה</span>
                )}
                <CalendarIcon className="mr-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={birthDate}
                onSelect={(date: Date | undefined) => {
                  if (!date) return;
                  setBirthDate(date);
                  setValue("birthDate", date);
                }}
                disabled={(date: Date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.birthDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.birthDate.message}
            </p>
          )}
        </div>
        <div>
          <Label>תאריך הצטרפות</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-right"
              >
                {joinDate ? (
                  format(joinDate, "dd/MM/yyyy", { locale: he })
                ) : (
                  <span>בחר תאריך הצטרפות</span>
                )}
                <CalendarIcon className="mr-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={joinDate}
                onSelect={(date: Date | undefined) => {
                  if (!date) return;

                  setJoinDate(date);
                  setValue("joinDate", date);
                }}
                disabled={(date: Date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.joinDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.joinDate.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="grade">כיתה</Label>
          <Select
            onValueChange={(value) => setValue("grade", Number.parseInt(value))}
            defaultValue={initialData?.grade?.toString() || "1"}
          >
            <SelectTrigger className="w-full text-right">
              <SelectValue placeholder="בחר כיתה" />
            </SelectTrigger>
            <SelectContent>
              {israeliGrades.map((grade) => (
                <SelectItem key={grade} value={grade.toString()}>
                  {gradeToHebrewName(grade)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.grade && (
            <p className="text-red-500 text-sm mt-1">{errors.grade.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-3 md:col-span-1">
          <Label htmlFor="city">עיר</Label>
          <Input id="city" {...register("city")} placeholder="שם העיר" />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>
        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="street">רחוב</Label>
          <Input id="street" {...register("street")} placeholder="שם הרחוב" />
          {errors.street && (
            <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>
          )}
        </div>
        <div className="col-span-1">
          <Label htmlFor="houseNumber">מספר בית</Label>
          <Input
            id="houseNumber"
            {...register("houseNumber")}
            placeholder="מספר"
          />
          {errors.houseNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.houseNumber.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label>מספרי טלפון</Label>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center space-x-2 rtl:space-x-reverse mt-2"
          >
            <Select
              onValueChange={(value) => {
                setValue(`phones.${index}.title`, value);
              }}
              defaultValue={field.title}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="בחר כותרת" />
              </SelectTrigger>
              <SelectContent>
                {phoneTitles.map((title) => (
                  <SelectItem key={title} value={title}>
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="05xxxxxxxx"
              {...register(`phones.${index}.number`)}
              defaultValue={field.number}
            />
            {index > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        {errors.phones && (
          <p className="text-red-500 text-sm mt-1">{errors.phones.message}</p>
        )}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => append({ title: "", number: "" })}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          הוסף מספר טלפון
        </Button>
      </div>

      <div>
        <Label>תחביבים</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {predefinedHobbies.map((hobby) => (
            <div
              key={hobby}
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <Checkbox
                id={hobby}
                checked={selectedHobbies.includes(hobby)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedHobbies([...selectedHobbies, hobby]);
                  } else {
                    setSelectedHobbies(
                      selectedHobbies.filter((h) => h !== hobby)
                    );
                  }
                }}
              />
              <Label
                htmlFor={hobby}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {hobby}
              </Label>
            </div>
          ))}
        </div>
        {selectedHobbies.includes("אחר") && (
          <Input
            className="mt-2"
            placeholder="תחביב אחר"
            {...register("customHobby")}
          />
        )}
        {errors.hobbies && (
          <p className="text-red-500 text-sm mt-1">{errors.hobbies.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        {initialData ? "עדכן חבר" : "שמור חבר"}
      </Button>
    </form>
  );
}
