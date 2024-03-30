'use client';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

type BreadcrumbNavData = Array<{ name: string; href: string }>;
//{ items = [] }: BreadcrumbNavData

export default function BreadcrumbNav() {

  const pathname = usePathname();

  const pageNames:any = {
    "login": "Login",
    "apiaccess": "Api Access",
    "/": "Home",
  };

  const items:BreadcrumbNavData = [];

  const pathArray = pathname.split('/').filter((v,i)=> !(i === pathname.length - 1 && v === ''));
  pathArray[0] = '/';
  pathArray.forEach((v: string)=> {
;    items.push({ name: pageNames[v], href: v});
  });

  const last = items.length - 1;  
  return (
    <div className="flex m-2 border p-3 rounded-lg xl:mx-auto max-w-7xl mx-5">
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((v, i) => (
            <Fragment key={i}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={v.href}>{v.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {last > i && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
