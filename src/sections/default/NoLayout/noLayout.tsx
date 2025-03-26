import * as React from "react";
import { Loader } from "common/layout/components/loader";
import { injectIntl, IntlShape } from "react-intl";

interface NoLayoutProps  {
  children: any;
  title: string;
  intl:IntlShape;
}

interface NoLayoutState extends React.PropsWithChildren {
  children: any;
}

export class NoLayoutComponent extends React.PureComponent<NoLayoutProps, NoLayoutState> {
  public constructor(props: NoLayoutProps) {
    super(props);
  }

  public render() {
    return (
      <React.Suspense fallback={<Loader />}>

        {this.props.children}

      </React.Suspense>
    );
  }
}

export const NoLayout = injectIntl(NoLayoutComponent);