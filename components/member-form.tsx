"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Member } from "@/types/member";
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
import { israeliGrades, gradeToHebrewName } from "@/utils/grade";
import { createMember, saveMember } from "@/utils/members/supabase";

const predefinedHobbies = ["ריקוד", "שירה", "ספורט", "מחשבים", "הדרכה"];

const phoneTitles = ["אישי", "אמא", "אבא", "אחר"];

interface MemberFormProps {
  initialData?: Member & { id?: number };
}

export default function MemberForm({ initialData }: MemberFormProps) {
  const [birthDate, setBirthDate] = useState<Date | undefined>(
    initialData?.birthDate ? new Date(initialData.birthDate) : undefined
  );
  const [joinDate, setJoinDate] = useState<Date | undefined>(
    initialData?.joinDate ? new Date(initialData.joinDate) : undefined
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    resetField,
    watch,
  } = useForm({
    resolver: zodResolver(Member),
    defaultValues: initialData || {
      phones: [{ title: "", number: "" }],
      hobbies: [],
      grade: 1,
    },
  });

  const {
    fields: phonesValues,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control,
    name: "phones",
  });

  const hobbies = watch("hobbies");
  const addHobby = (hobby: string) => setValue("hobbies", [...hobbies, hobby]);
  const removeHobby = (hobbyToRemove: string) =>
    setValue(
      "hobbies",
      hobbies.filter((hobby) => hobby !== hobbyToRemove)
    );

  const onSubmit = async (data: Member) => {
    const isNew = !initialData;
    const savePromise = isNew ? createMember(data) : saveMember(data);

    toast.promise(savePromise, {
      loading: isNew ? "יוצר..." : "שומר...",
      success: isNew ? "החניך נוצר בהצלחה!" : "החניך נשמר בהצלחה!",
      error: isNew ? "שגיאה ביצירת החניך!" : "שגיאה בשמירת החניך!",
    });

    savePromise.catch((...args) =>
      console.error("Failed in saving member!", ...args)
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="identityNumber">מספר תעודת זהות</Label>
          <Input
            id="identityNumber"
            {...register("identityNumber")}
            placeholder="מספר תעודת זהות"
          />
          {errors.identityNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.identityNumber.message}
            </p>
          )}
        </div>
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
                onSelect={(date) => {
                  setBirthDate(date);
                  setValue("birthDate", date ?? null);
                }}
                disabled={(date) =>
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
                onSelect={(date) => {
                  if (!date) {
                    setJoinDate(date);
                    resetField("joinDate");
                    return;
                  }

                  setJoinDate(date);
                  setValue("joinDate", date);
                }}
                disabled={(date) =>
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
          <Input
            id="city"
            {...register("address.city")}
            placeholder="שם העיר"
          />
          {errors.address?.city && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address?.city.message}
            </p>
          )}
        </div>
        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="street">רחוב</Label>
          <Input
            id="street"
            {...register("address.street")}
            placeholder="שם הרחוב"
          />
          {errors.address?.street && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address?.street.message}
            </p>
          )}
        </div>
        <div className="col-span-1">
          <Label htmlFor="houseNumber">מספר בית</Label>
          <Input
            id="houseNumber"
            {...register("address.houseNumber")}
            placeholder="מספר"
          />
          {errors.address?.houseNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address?.houseNumber.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label>מספרי טלפון</Label>
        {phonesValues.map((field, index) => (
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
                onClick={() => removePhone(index)}
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
          onClick={() => appendPhone({ title: "", number: "" })}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          הוסף מספר טלפון
        </Button>
      </div>

      <div>
        <Label>תחביבים</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {predefinedHobbies.map((hobby) => (
            <label
              key={hobby}
              className="flex items-center space-x-2 space-x-reverse"
            >
              <Checkbox
                value={hobby}
                checked={hobbies.includes(hobby)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    addHobby(hobby);
                  } else {
                    removeHobby(hobby);
                  }
                }}
              />
              <span className="mr-2">{hobby}</span>
            </label>
          ))}
        </div>
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
