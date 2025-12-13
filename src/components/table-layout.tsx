import { Icon } from "@iconify/react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

interface ITableLayoutProps {
    title: string;
    description: string;
    search: {
        placeholder: string;
        onChange: (value: string) => void;
    };
    actions: React.ReactNode;
    children: React.ReactNode;
}

export default function TableLayout({
    children,
    title,
    description,
    search,
    actions,
}: ITableLayoutProps) {
    return (
        <Card>
            <CardHeader className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="text-muted-foreground">{description}</p>
                </div>

                <div className="flex items-center gap-4 justify-between w-full">
                    <InputGroup>
                        <InputGroupInput
                            className="w-full"
                            placeholder={search.placeholder}
                            onChange={(e) => search.onChange(e.target.value)}
                        />
                        <InputGroupAddon align="inline-end">
                            <Icon icon="lucide:search" className="h-4 w-4" />
                        </InputGroupAddon>
                    </InputGroup>

                    {actions}
                </div>
            </CardHeader>

            <CardContent>{children}</CardContent>
        </Card>
    );
}
